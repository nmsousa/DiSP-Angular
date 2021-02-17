import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Template } from '../../shared/models/entities/template.model';
import { SecurityRole } from '../../shared/models/enums/security-role.enum';
import { PersonOption } from '../../shared/models/person-option';
import { TemplateAssociationArrays, TemplateService } from '../../shared/services/template.service';
import { SignatureType } from './../../shared/models/entities/signature-type.model';

export abstract class BaseGetTemplateComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  template: Template;
  selectedSignatureType: SignatureType;
  signatureTypeInfoPopupVisible: boolean;
  signatories: PersonOption[] = [];
  securityAndRoles: PersonOption[] = [];
  templateUsersAndOwners: PersonOption[] = [];
  securityRoles: Array<{ role: SecurityRole, active: boolean }> = [];
  templateRoles: Array<{ role: SecurityRole, active: boolean }> = [];
  isLoading: boolean = false;

  constructor(
    protected route: ActivatedRoute,
    protected templateService: TemplateService) { }

  ngOnInit() {
    this.getTemplateByRouteId();

    this.securityRoles = TemplateService.getSecurityRoles();
    this.templateRoles = TemplateService.getTemplateRoles();
  }

  private getTemplateByRouteId(): void {
    this.subscriptions.push(this.route.params.subscribe(params => {

      this.isLoading = true;

      // Get the template
      this.getTemplate(params['id']);

    }));
  }

  protected getTemplate(id: number): void {
    this.subscriptions.push(this.templateService.getTemplate(id)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(result => {
        if (result) {
          this.template = result.content;

          this.setTemplateData();

          this.selectedSignatureType = this.template.signatureType;
        }
      })
    );
  }

  protected setTemplateData(): void {
    const splittedArrays: TemplateAssociationArrays =
      this.templateService.splitTemplateAssociationsIntoArrays(this.template);

    this.signatories = splittedArrays.signatories;
    this.securityAndRoles = splittedArrays.securityAndRoles;
    this.templateUsersAndOwners = splittedArrays.templateUsersAndOwners;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
