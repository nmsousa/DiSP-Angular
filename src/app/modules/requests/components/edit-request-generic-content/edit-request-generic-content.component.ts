import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { WorkflowTypes } from 'src/app/shared/models/enums/workflow-types.enum';
import { SignatureTypesService } from 'src/app/shared/services/signature-types.service';

import { Request } from '../../../../shared/models/entities/request.model';
import { SignatureType } from '../../../../shared/models/entities/signature-type.model';
import { TemplateAssociation } from '../../../../shared/models/entities/template-association.model';
import { Template } from '../../../../shared/models/entities/template.model';
import { User } from '../../../../shared/models/entities/user.model';
import { SecurityRole } from '../../../../shared/models/enums/security-role.enum';
import { PersonOption } from '../../../../shared/models/person-option';
import { GlobalService, MessageSeverity } from '../../../../shared/services/global.service';
import { RequestAssociationArrays } from '../../../../shared/services/request.service';
import { TemplateService } from '../../../../shared/services/template.service';
import { DateUtils } from '../../../../shared/utils/date.utils';
import { DeadlineType } from './../../../../shared/models/enums/deadline-type.enum';

@Component({
  selector: 'app-edit-request-generic-content',
  templateUrl: './edit-request-generic-content.component.html',
  styleUrls: ['./edit-request-generic-content.component.less']
})
export class EditRequestGenericContentComponent implements OnInit, OnChanges, OnDestroy {

  @Input() isNew: boolean = false; // New Request = true, Edit Request = False
  @Input() isFormReady: boolean = false; // In the case of the edit request, the form is only ready after updated with the request values
  @Input() form: FormGroup;
  @Input() deadlineTime: Date;
  @Input() securityAndRoles: PersonOption[] = [];
  @Input() signatories: PersonOption[] = [];
  @Input() selectedSignatureType: SignatureType;
  @Input() metadata: any[] = [];

  @Output() formCreated: EventEmitter<FormGroup> = new EventEmitter();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSave: EventEmitter<RequestAssociationArrays> = new EventEmitter();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onChanges: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('fileInput', {static: false})
  fileInput: ElementRef;

  existingFileName: string = '';

  subscriptions: Subscription[] = [];

  signatureTypes: Array<{ links: [], content: SignatureType }> = [];
  signatureTypeInfoPopupVisible: boolean = false;

  openRequestInfoPopupVisible: boolean = false;

  request: Request;
  rolesPerPerson: Map<string, string[]> = new Map();
  securityRoles: Array<{role: SecurityRole, active: boolean}> = TemplateService.getSecurityRoles();

  isTemplatesModalModalVisible: boolean = false;
  isLoading: boolean = false;
  hasChanges: boolean = false;

  /* Metadata table */

  metadataIndex: number = 0;
  editMetadataCache: { [key: string]: any } = {};

  WorkflowTypes = WorkflowTypes;
  DeadlineType = DeadlineType;

  disablePastDates = (current: Date): boolean => {
    // Can not select days before today
    return DateUtils.isPastOrPresentDate(current);
  }

  /**
   * makes the field required if the predicate function returns true
   */
  requiredIfValidator(predicate) {
    return (formControl => {
      if (formControl) {
        if (!formControl.parent) {
          return null;
        }

        const predicFunc: any = predicate();
        if (predicFunc) {
          if (predicFunc.deadlineType === DeadlineType.DEADLINE_TYPE_FLEXIBLE_MANDATORY ||
            predicFunc.deadlineType === DeadlineType.DEADLINE_TYPE_STRONG_MANDATORY) {

           return Validators.required(formControl);
         }
        }

      }

      return null;
    });
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private modalService: NzModalService,
    private globalService: GlobalService,
    private signatureTypesService: SignatureTypesService) { }

  ngOnInit() {
    this.getSignatureTypes();

    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      document: this.fb.group({ // make a nested group
        title: ['', [Validators.required]],
        data: [null, this.isNew ? [Validators.required] : null],
        filename: [''],
        mimetype: [''],
        size: [0],
      }),
      id: [0],
      deadline: ['', this.requiredIfValidator(() => this.selectedSignatureType)],
      signatureType: ['', Validators.required],
      open: [false],
      sendRequest: [false]
    });

    this.formCreated.emit(this.form);
  }

  addFormChangesListener(): void {
     // To give this component time to run the directives like the appDisableControl
     setTimeout(() => {
      this.subscriptions.push(
        this.form.valueChanges.subscribe(() => {
          this.changesHandler(true);
        })
      );
    }, 1);
  }

  changesHandler(value: boolean): void {
    this.hasChanges = value;
    this.onChanges.emit(value);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'metadata': {
            if (changes.metadata.currentValue && changes.metadata.currentValue.length > 0) {
              this.editMetadataCache = {};
              this.updateEditCache();
            }
            break;
          }
          case 'isNew': { // NEW
            if (changes.isNew.currentValue) {
              this.addFormChangesListener();
            }
            break;
          }
          case 'isFormReady': { // EDIT
            if (changes.isFormReady.currentValue) {
              this.addFormChangesListener();
            }
            break;
          }
        }
      }
    }
  }

  getSignatureTypes(): void {
    this.subscriptions.push(
      this.signatureTypesService.getAll().subscribe(result => {
        this.signatureTypes = result.content;
      })
    );
  }

  onSelectSignatureType(signatureTypeName: string): void {
    const sigType: { links: [], content: SignatureType } = this.signatureTypes.find(item => item.content.name === signatureTypeName);

    this.selectedSignatureType = sigType ? sigType.content : null;

    // Deadline is only mandatory if the signatureType.deadlineType is Mandatory
    this.form.get('deadline').updateValueAndValidity();
  }

  onFileChange(event: any) {
    const reader: FileReader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      // In case we are changing the filename, to keep the old filename value and show it to the user
      if (!this.isNew && !this.existingFileName) {
        this.existingFileName = this.form.value.document.filename;
      }

      // File size > 20MB
      if (file.size > 20971520) {
        this.fileInput.nativeElement.value = ''; // Clear the selected file that is too big
        this.globalService.showMessage(MessageSeverity.ERROR, 'CERTIFY_DOCUMENT.ERROR.FILE_SIZE');
      } else { // File size <= 20MB
          reader.onload = () => {
            this.form.patchValue({
              document: {
                data: reader.result,
                filename: file.name,
                mimetype: file.type,
                size: file.size
              }
            });
          };
        }
    } else {
      this.form.patchValue({
        document: {
          data: null,
          filename: '',
          mimetype: '',
          size: 0
        }
      });
    }

  }

  onChangeDeadlineDate(): void {
    // If the user already setted the time, we don't want to override it
    if (!this.deadlineTime) {
      this.deadlineTime = new Date();
      DateUtils.getEndOfTheDay(this.deadlineTime);
    }
  }

  public updatePersons(personsListName: string, newPersonsList: PersonOption[]): void {
    this[personsListName] = newPersonsList;
    this.changesHandler(true);
  }

  openUseTemplatePopup(): void {
    this.isTemplatesModalModalVisible = true;
  }

  handleTemplatesModalOk(event: Template): void {
    this.isTemplatesModalModalVisible = false;

    // Apply selected template
    this.form.patchValue({
      signatureType: event.signatureType ? event.signatureType.name : ''
    });

    // Clear previous array values
    this.signatories = [];
    this.securityAndRoles = [];

    // Fill signatories and securityAndRoles array with the template data
    this.fillSignatoriesAndSecurityAndRolesFromTemplate(event.templateAssociations);
  }

  fillSignatoriesAndSecurityAndRolesFromTemplate(templateAssociations: TemplateAssociation[]): void {
    // We need to use a map because there are TemplateAssociations without a full User (they have only the @jsonTag id reference)
    const usersMap: Map<any, User> = TemplateService.getFullUsersMap(templateAssociations);

    templateAssociations.forEach(templateAssociation => {
      let person: PersonOption = new PersonOption();

      templateAssociation.user = templateAssociation.user.username ? templateAssociation.user : usersMap.get(templateAssociation.user);

      person.epId = templateAssociation.user.epId;
      person.label = templateAssociation.user.fullName;
      person.username = templateAssociation.user.username;

      // Signatory
      if (templateAssociation.role === SecurityRole.ROLE_SIGNATORY) {
          this.signatories.push(person);

      // Security and Role
      } else if (TemplateService.isSecurityRole(templateAssociation.role)) {

        // Check if this user was already added
        const securityAndRole: PersonOption = this.securityAndRoles.find(item => item.epId === person.epId);

        if (!securityAndRole) {
          person.roles = TemplateService.getSecurityRoles();

          this.securityAndRoles.push(person);
        } else {
          person = securityAndRole;
        }

        person.roles.forEach(role => {
          if (role.role === templateAssociation.role) {
            role.active = true;
          }
        });

      }
    });
  }

  handleTemplatesModalCancel(): void {
    this.isTemplatesModalModalVisible = false;
  }

  /* Metadata table */

  addRow(): void {
    this.metadata = [
      ...this.metadata,
      {
        id: `${this.metadataIndex}`,
        metatype: {
          name: ''
        },
        value: ''
      }
    ];

    this.metadataIndex++;
    this.updateEditCache();
  }

  startEdit(id: string): void {
    this.editMetadataCache[id].edit = true;
  }

  deleteEdit(id: string): void {
    this.metadata = this.metadata.filter(item => item.id !== id);
  }

  cancelEdit(id: string): void {
    const index = this.metadata.findIndex(item => item.id === id);
    this.editMetadataCache[id] = {
      data: { ...this.metadata[index] },
      edit: false
    };
  }

  saveEdit(id: string): void {
    const index = this.metadata.findIndex(item => item.id === id);
    Object.assign(this.metadata[index], this.editMetadataCache[id].data);
    this.editMetadataCache[id].edit = false;
  }

  updateEditCache(): void {
    this.metadata.forEach(item => {
      this.editMetadataCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  /* End metadata table */

  onSaveHandler(): void {
    this.onSave.emit({
      signatories: this.signatories,
      securityAndRoles: this.securityAndRoles,
      metadata: this.metadata
    });
  }

  onCancel(): void {
    // Navigates to the List Request Page
    this.router.navigateByUrl(`/requests`);
  }

  openRequestModalHandler(): void {
    this.subscriptions.push(this.globalService.getTranslation([
      'EDIT_REQUEST.OPEN_REQUEST.POPUP.DESCRIPTION'
    ]
    ).subscribe((result: string) => {
      this.modalService['info']({
        nzMask: false,
        nzWidth: 600,
        nzContent: result['EDIT_REQUEST.OPEN_REQUEST.POPUP.DESCRIPTION']
      });
    }));

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe);
  }

}
