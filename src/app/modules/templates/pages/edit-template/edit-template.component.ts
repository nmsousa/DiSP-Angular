import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DialogCanDeactivateService } from 'src/app/shared/services/dialog-can-deactivate.service';

import { BaseGetTemplateComponent } from '../../base-get-template.component';
import { SignatureType } from './../../../../shared/models/entities/signature-type.model';
import { TemplateThirdParty } from './../../../../shared/models/entities/template-third-party.model';
import { Template } from './../../../../shared/models/entities/template.model';
import { PersonOption } from './../../../../shared/models/person-option';
import { GlobalService, MessageSeverity } from './../../../../shared/services/global.service';
import { SignatureTypesService } from './../../../../shared/services/signature-types.service';
import { TemplateService } from './../../../../shared/services/template.service';

@Component({
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.less'],
})
export class EditTemplateComponent extends BaseGetTemplateComponent implements OnInit, OnDestroy {

  form: FormGroup;
  signatureTypes: Array<{ links: [], content: SignatureType }> = [];
  thirdParties: TemplateThirdParty[] = [];
  hasChanges: boolean = false;

  constructor(
    route: ActivatedRoute,
    templateService: TemplateService,
    private router: Router,
    private fb: FormBuilder,
    private dialogCanDeactivateService: DialogCanDeactivateService,
    private globalService: GlobalService,
    private signatureTypesService: SignatureTypesService) {
    super(route, templateService);
  }

  ngOnInit() {
    super.ngOnInit();

    this.createForm();
    this.getSignatureTypes();
  }

  createForm(): void {
    this.form = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      signatureType: ['', Validators.required],
      status: [1]
    });
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

  // Overring
  setTemplateData(): void {
    super.setTemplateData();

    this.thirdParties = this.template.templateThirdParty;

    this.form.patchValue({ id: this.template.id });
    this.form.patchValue({ title: this.template.title });
    this.form.patchValue({ signatureType: this.template.signatureType.name });
    this.form.patchValue({ status: this.template.status });

    this.addFormChangesListener();
  }

  public updatePersons(personsListName: string, newPersonsList: PersonOption[]): void {
    this[personsListName] = newPersonsList;
    this.hasChanges = true;
  }

  onSave(): void {
    const template: Template = this.form.value;
    template.templateThirdParty = this.thirdParties;

    this.subscriptions.push(
      this.templateService.update(
        template,
        {
          signatories: this.signatories,
          securityAndRoles: this.securityAndRoles,
          templateUsersAndOwners: this.templateUsersAndOwners
        }
      ).pipe(
        catchError(err => {
          return throwError(err);
        })
      )
        .subscribe(() => {
          this.hasChanges = false;
          this.globalService.showMessage(MessageSeverity.SUCCESS, 'TEMPLATES.UPDATE.SUCCESS');

          this.router.navigateByUrl(`/templates/${this.template.id}`);
        })
    );

  }

  onCancel(): void {
    // Navigates to the View Template Page
    this.router.navigateByUrl(`/templates/${this.template.id}`);
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
