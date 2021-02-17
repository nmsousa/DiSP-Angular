import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { TemplateAssociation } from './../models/entities/template-association.model';
import { TemplateThirdParty } from './../models/entities/template-third-party.model';
import { Template } from './../models/entities/template.model';
import { User } from './../models/entities/user.model';
import { SecurityRole } from './../models/enums/security-role.enum';
import { FilterField } from './../models/filter-field';
import { NewTemplateInput } from './../models/input/new-template-input.model';
import { UpdateTemplateInput } from './../models/input/update-template-input.model';
import { PersonOption } from './../models/person-option';
import { SortOrder } from './../models/sort-config';
import { AuthenticationService } from './authentication.service';
import { BACKEND_PAGINATION_DEFAULT, BaseRemoteService } from './base-remote.service';
import { GlobalService, MessageSeverity } from './global.service';

export interface TemplateAssociationArrays {
  signatories: PersonOption[];
  securityAndRoles: PersonOption[];
  templateUsersAndOwners: PersonOption[];
}

@Injectable({
  providedIn: 'root'
})
export class TemplateService extends BaseRemoteService {

  emptyTemplateError: string = 'Template must not be null';

  public static isSecurityRole(role: SecurityRole): boolean {
    return role === SecurityRole.ROLE_AS_CONSUMER ||
      role === SecurityRole.ROLE_AS_CREATOR ||
      role === SecurityRole.ROLE_AS_SIGNATORY;
  }

  public static getFullUsersMap(templateAssociations: TemplateAssociation[]): Map<any, User> {
    // We need to use a map because there are TemplateAssociations without a full User (they have only the @jsonTag id reference)
    const usersMap: Map<any, User> = new Map<any, User>();

    templateAssociations.forEach(association => {

      if (association.user) {
        // If it's a full User, we store it to use when it's not a full User
        if (association.user.username) {
          usersMap.set(association.user['@jsonTag'], association.user);
        }
      }
    });

    return usersMap;
  }

  constructor(injector: Injector, private authenticationService: AuthenticationService, private globalService: GlobalService) {
    super(injector);
  }

  public static getSecurityRoles(): Array<{ role: SecurityRole, active: boolean }> {
    const arrayCopy: Array<{ role: SecurityRole, active: boolean }> = JSON.parse(JSON.stringify([
      { role: SecurityRole.ROLE_AS_SIGNATORY, active: false },
      { role: SecurityRole.ROLE_AS_CONSUMER, active: false },
      { role: SecurityRole.ROLE_AS_CREATOR, active: false }
    ]));

    return arrayCopy;
  }

  public static getTemplateRoles(): Array<{ role: SecurityRole, active: boolean }> {
    const arrayCopy: Array<{ role: SecurityRole, active: boolean }> = JSON.parse(JSON.stringify([
      { role: SecurityRole.ROLE_TEMPLATE_OWNER, active: false },
      { role: SecurityRole.ROLE_TEMPLATE_USER, active: false }
    ]));

    return arrayCopy;
  }

  // Get the Templates from the API
  public getTemplates(
    filters: FilterField[] = null,
    pageIndex: number = 0,
    pageSize: number = BACKEND_PAGINATION_DEFAULT,
    sortField: string = null,
    sortOrder: SortOrder = SortOrder.ASC
  ): Observable<any> {

    let httpParams = this.getDefaultsHttpParams(pageIndex, pageSize);

    // Sort
    if (sortField && sortOrder) {
      sortField = this.replaceByEntityField(sortField);
      httpParams = httpParams.append('sort', `${sortField},${sortOrder}`);
    }

    // Filters
    httpParams = this.addFiltersToHttpParams(filters, httpParams)
      .append('username', this.authenticationService.getUsername());

    return this.http.get<any>(`${this.apiUrl}admin/templates`, { params: httpParams });
  }

  /**
   * Get Template by id
   */
  public getTemplate(id: number = 0): Observable<any> {
    if (!id) {
      throw new Error(this.emptyTemplateError);
    }

    return this.http.get<any>(`${this.apiUrl}admin/templates/${id}`);
  }

  public update(template: any, templateAssociationsArrays: TemplateAssociationArrays): Observable<any> {
    if (!template) {
      throw new Error(this.emptyTemplateError);
    }

    // Copy from Template to UpdateTemplateInput all the properties that exist also in UpdateTemplateInput
    const updateTemplateInput: UpdateTemplateInput = new UpdateTemplateInput();

    updateTemplateInput.id = template.id;
    updateTemplateInput.status = template.status;
    updateTemplateInput.signatureType = template.signatureType;
    updateTemplateInput.title = template.title;

    updateTemplateInput.templateThirdParty = this.getTemplateThirdParty(template.templateThirdParty);

    updateTemplateInput.templateAssociations = this.getTemplateAssociations(templateAssociationsArrays);

    if (updateTemplateInput.templateAssociations !== null) {
      return this.http.put<any>(this.apiUrl + `admin/templates/${template.id}`, updateTemplateInput);
    }

    // We got an error, therefore we don't want to proceed with the save
    return throwError('Invalid User Roles');
  }

  public updateStatus(template: Template): Observable<any> {
    if (!template) {
      throw new Error(this.emptyTemplateError);
    }

    // If we are deactivating the Template
    if (template.status === 0) {
      return this.http.delete<any>(this.apiUrl + `admin/templates/${template.id}`);
    }

    // Activating the Template
    return this.http.patch<any>(this.apiUrl + `admin/templates/${template.id}/activate`, {});
  }

  public create(
    template: any,
    templateAssociationsArrays: TemplateAssociationArrays): Observable<any> {

    if (!template) {
      throw new Error(this.emptyTemplateError);
    }

    // Copy from Template to NewTemplateInput all the properties that exist also in NewTemplateInput
    const newTemplateInput: NewTemplateInput = new NewTemplateInput();
    Object.keys(newTemplateInput).forEach(key => {
      // copy only the non array fields
      if (newTemplateInput[key] instanceof Array === false) {
        newTemplateInput[key] = template[key];
      }
    });

    newTemplateInput.templateThirdParty = this.getTemplateThirdParty(template.templateThirdParty);

    newTemplateInput.templateAssociations = this.getTemplateAssociations(templateAssociationsArrays);

    if (newTemplateInput.templateAssociations !== null) {
      return this.http.post<any>(this.apiUrl + `admin/templates`, newTemplateInput);
    }

    // We got an error, therefore we don't want to proceed with the save
    return throwError('Invalid User Roles');
  }

  private getTemplateThirdParty(templateThirdParty: TemplateThirdParty[]): any[] {
    const newTemplateThirdPartyInputArray: any[] = [];

    if (templateThirdParty) {
      templateThirdParty.forEach(item => {
        newTemplateThirdPartyInputArray.push({email: item.email});
      });
    }

    return newTemplateThirdPartyInputArray;
  }

  private getTemplateAssociations(templateAssociationsArrays: TemplateAssociationArrays): any[] {
    const templateAssocations: any[] = []; // of type TemplateAssociation
    let hasErrors: boolean = false; // It's only valid if at least one role is active, otherwise the user forgot to select a role

    if (templateAssociationsArrays) {

      // Signatories
      if (templateAssociationsArrays.signatories) {
        templateAssociationsArrays.signatories.forEach(signatory => {
          templateAssocations.push(
            {
              user: signatory.username,
              role: SecurityRole.ROLE_SIGNATORY,
              assignmentOrder: templateAssocations.length + 1
            }
          );
        });
      }

      let isValid: boolean = false; // It's only valid if at least one role is active, otherwise the user forgot to select a role

      // Security And Roles
      if (templateAssociationsArrays.securityAndRoles) {
        templateAssociationsArrays.securityAndRoles.forEach(securityAndRole => {
          isValid = false;
          securityAndRole.roles.forEach(roleItem => {
            if (roleItem.active) {
              isValid = true;
              templateAssocations.push(
                {
                  user: securityAndRole.username,
                  role: roleItem.role,
                  assignmentOrder: templateAssocations.length + 1
                }
              );
            }
          });
          if (!isValid) {
            this.globalService.showMessage(
              MessageSeverity.ERROR,
              'EDIT_TEMPLATE.ERROR.SECURITY_AND_ROLES.SAVE',
              '',
              { user: securityAndRole.username });

            hasErrors = true;
          }
        });
      }

      // Templates (Owners and Users)
      if (templateAssociationsArrays.templateUsersAndOwners) {
        templateAssociationsArrays.templateUsersAndOwners.forEach(template => {
          isValid = false;
          template.roles.forEach(roleItem => {
            if (roleItem.active) {
              isValid = true;
              templateAssocations.push(
                {
                  user: template.username,
                  role: roleItem.role,
                  assignmentOrder: templateAssocations.length + 1
                }
              );
            }
          });
          if (!isValid) {
            this.globalService.showMessage(
              MessageSeverity.ERROR,
              'EDIT_TEMPLATE.ERROR.TEMPLATES.SAVE',
              '',
              { user: template.username });

            hasErrors = true;
          }
        });
      }

    }

    return !hasErrors ? templateAssocations : null;
  }

  splitTemplateAssociationsIntoArrays(template: Template): TemplateAssociationArrays {
    // tslint:disable-next-line: prefer-const
    let templateAssociationArrays: TemplateAssociationArrays = {
      signatories: [], securityAndRoles: [], templateUsersAndOwners: []
    };

    if (template.templateAssociations && template.templateAssociations.length > 0) {

      const usersMap: Map<any, User> = TemplateService.getFullUsersMap(template.templateAssociations);

      template.templateAssociations.forEach(association => {

        association.user = association.user.username ? association.user : usersMap.get(association.user);

        // Signatory
        if (association.role === SecurityRole.ROLE_SIGNATORY) {
          const personOption: PersonOption = this.getNewPersonOption(association);

          personOption.roles.push({ role: SecurityRole.ROLE_SIGNATORY, active: true });
          templateAssociationArrays.signatories.push(personOption);
        }

        // Security and Roles
        if (TemplateService.isSecurityRole(association.role)) {
          this.activatePersonRole(templateAssociationArrays.securityAndRoles, association);

          // Templates
        } else if (this.isTemplateRole(association.role)) {
          this.activatePersonRole(templateAssociationArrays.templateUsersAndOwners, association);
        }

      });

    }

    return templateAssociationArrays;
  }

  activatePersonRole(personsList: PersonOption[], association: TemplateAssociation): void {
    let personOption: PersonOption = personsList.find(person => person.username === association.user.username);

    // If this person doesn't exist yet in the list, we create a new one and add it
    if (!personOption) {
      personOption = this.getNewPersonOption(association);

      personOption.roles = TemplateService.isSecurityRole(association.role) ?
        TemplateService.getSecurityRoles() :
        TemplateService.getTemplateRoles();

      personsList.push(personOption);
    }

    personOption.roles.forEach(item => {
      if (item.role === association.role) {
        item.active = true;
      }
    });

  }

  getNewPersonOption(association: TemplateAssociation): PersonOption {
    const personOption: PersonOption = new PersonOption();
    personOption.epId = association.user.epId;
    personOption.label = association.user.fullName;
    personOption.username = association.user.username;

    return personOption;
  }

  isTemplateRole(role: SecurityRole): boolean {
    return role === SecurityRole.ROLE_TEMPLATE_OWNER ||
      role === SecurityRole.ROLE_TEMPLATE_USER;
  }

  /**
   * When a property has a different name in the Model other than the one in the Entity
   * @param sortField property to check if we need to rename
   */
  protected replaceByEntityField(field: string): string {
    // Fix because the 'creationDate' in the Java Model has the name 'dateCreated' in the Java Entity
    switch (field) {
      case 'creationDate': {
        field = 'dateCreated';
        break;
      }
      default: {
        break;
      }
    }

    return field;
  }

}
