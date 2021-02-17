import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { SignatureType } from './../../../../shared/models/entities/signature-type.model';
import { TemplateThirdParty } from './../../../../shared/models/entities/template-third-party.model';
import { Template } from './../../../../shared/models/entities/template.model';
import { User } from './../../../../shared/models/entities/user.model';
import { SecurityRole } from './../../../../shared/models/enums/security-role.enum';
import { PersonOption } from './../../../../shared/models/person-option';
import { DialogCanDeactivateService } from './../../../../shared/services/dialog-can-deactivate.service';
import { GlobalService, MessageSeverity } from './../../../../shared/services/global.service';
import { SignatureTypesService } from './../../../../shared/services/signature-types.service';
import { TemplateService } from './../../../../shared/services/template.service';

@Component({
  templateUrl: './new-template.component.html',
  styleUrls: ['./new-template.component.less']
})
export class NewTemplateComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  form: FormGroup;
  signatureTypes: Array<{ links: [], content: SignatureType }> = [];
  selectedSignatureType: SignatureType;
  signatureTypeInfoPopupVisible: boolean = false;
  signatories: PersonOption[] = [];
  securityAndRoles: PersonOption[] = [];
  templateUsersAndOwners: PersonOption[] = [];
  securityRoles: Array<{role: SecurityRole, active: boolean}> = TemplateService.getSecurityRoles();
  templateRoles: Array<{role: SecurityRole, active: boolean}> = TemplateService.getTemplateRoles();
  thirdParties: TemplateThirdParty[] = [];
  hasChanges: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogCanDeactivateService: DialogCanDeactivateService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private templateService: TemplateService,
    private signatureTypesService: SignatureTypesService,
    private globalService: GlobalService

    ) { }

  ngOnInit() {
    this.createForm();
    this.getSignatureTypes();
    // Add current user as Template_Owner and Template_User
    this.addCurrentUserAsDefault();
  }

  createForm(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      signatureType: ['', Validators.required],
      status: [1]
    });

    this.addFormChangesListener();
  }

  addFormChangesListener(): void {
    this.subscriptions.push(
      this.form.valueChanges.subscribe(() => {
        this.hasChanges = true;
      })
    );
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
  }

  addCurrentUserAsDefault(): void {
    if (this.authenticationService.currentUser) {
      const currentUser: User = this.authenticationService.currentUser;

      const person: PersonOption = new PersonOption();
      person.epId = currentUser.epId;
      person.username = currentUser.username;
      person.label = currentUser.fullName;
      person.roles = [
        {role: SecurityRole.ROLE_TEMPLATE_OWNER, active: true},
        {role: SecurityRole.ROLE_TEMPLATE_USER, active: true}
      ];

      this.templateUsersAndOwners.push(person);
    }
  }

  public updatePersons(personsListName: string, newPersonsList: PersonOption[]): void {
    this[personsListName] = newPersonsList;
    this.hasChanges = true;
  }

  onSave(): void {
    const template: Template = this.form.value;
    template.templateThirdParty = this.thirdParties;

    this.subscriptions.push(
      this.templateService.create(
        template,
        {
          signatories: this.signatories,
          securityAndRoles: this.securityAndRoles,
          templateUsersAndOwners: this.templateUsersAndOwners
        },
      ).subscribe(() => {
        this.globalService.showMessage(MessageSeverity.SUCCESS, 'EDIT_TEMPLATE.SAVE.SUCCESS');
        this.router.navigateByUrl('/templates');
      })
    );
  }

  onCancel(): void {
    // Navigates to the List Template Page
    this.router.navigateByUrl(`/templates`);
  }

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no changes
    if (!this.hasChanges) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogCanDeactivateService.confirm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
