import {Injectable, Injector} from '@angular/core';
import {Observable, Subject, throwError} from 'rxjs';
import {tap} from 'rxjs/operators';

import {Assignment} from '../models/entities/assignment.model';
import {Document} from '../models/entities/document.model';
import {User} from '../models/entities/user.model';
import {MyDeadlineTypes} from '../models/enums/my-deadline-types.enum';
import {RequestStatuses} from '../models/enums/request-statuses.enum';
import {FilterField} from '../models/filter-field';
import {NewDocumentInput} from '../models/input/new-document-input.model';
import {NewRestPrincipalInputPurgeRequest} from '../models/input/new-rest-principal-input-purge-request.model';
import {NewRestPrincipalInput} from '../models/input/new-rest-principal-input.model';
import { UpdateBarcodeLocationInput } from '../models/input/update-barcode-location-input.model';
import {UpdateDocumentInput} from '../models/input/update-document-input.model';
import {UpdateRequestInput} from '../models/input/update-request-input.model';
import {RequestSelection} from '../models/request-selection';
import {SortOrder} from '../models/sort-config';
import {DateUtils} from '../utils/date.utils';
import {Association} from './../models/entities/association.model';
import {Request} from './../models/entities/request.model';
import {SecurityRole} from './../models/enums/security-role.enum';
import {NewRequestInput} from './../models/input/new-request-input.model';
import {PersonOption} from './../models/person-option';
import {AuthenticationService} from './authentication.service';
import {BACKEND_PAGINATION_DEFAULT, BaseRemoteService} from './base-remote.service';
import {GlobalService, MessageSeverity} from './global.service';
import {TemplateService} from './template.service';

export enum RequestActions {
  EDIT = 'EDIT',
  SEND = 'SEND',
  CANCEL = 'CANCEL',
  ARCHIVE = 'ARCHIVE',
  PURGE = 'PURGE',
}

export interface RequestAssociationArrays {
  signatories: PersonOption[];
  securityAndRoles: PersonOption[];
  metadata: any[];
}

@Injectable({
  providedIn: 'root',

})
export class RequestService extends BaseRemoteService {

  emptyRequestIdError: string = 'Request Id must not be null';
  emptyRequestError: string = 'Request must not be null';

  // To be subscribed for changes in the components that wan't to know when the request selection list changed
  public requestSelectionChange$ = new Subject<RequestSelection>();
  // If we executed an action over Requests, for example purged, we dispatch this event to inform that any request list might be outdated
  public requestsChanged$ = new Subject<boolean>();

  constructor(
    injector: Injector,
    private authenticationService: AuthenticationService,
    private globalService: GlobalService
  ) {
    super(injector);
  }

  /**
   * Get My Requests
   */
  public getRequestsByUserId(
    filters: FilterField[] = [],
    pageIndex: number = 0,
    pageSize: number = BACKEND_PAGINATION_DEFAULT,
    sortField: string = '',
    sortOrder: SortOrder = SortOrder.ASC
  ): Observable<any> {

    let httpParams = this.getDefaultsHttpParams(pageIndex, pageSize);

    // Sort
    if (sortField && sortOrder) {
      sortField = this.replaceByEntityFieldMyRequests(sortField);
      httpParams = httpParams.append('sort', `${sortField},${sortOrder}`);
    }

    // Filters
    httpParams = this.addFiltersToHttpParams(filters, httpParams);

    return this.http.get<any>(`${this.apiUrl}admin/requests/myrequests/${this.authenticationService.getUserId()}`,
      {params: httpParams, withCredentials: true});
  }

  /**
   * Get the Requests
   */
  public getRequests(
    filters: FilterField[] = [],
    pageIndex: number = 0,
    pageSize: number = BACKEND_PAGINATION_DEFAULT,
    sortField: string = '',
    sortOrder: SortOrder = SortOrder.ASC,
    showOnlyMyRequests: boolean = false
  ): Observable<any> {

    if (showOnlyMyRequests) {
      return this.getRequestsByUserId(filters, pageIndex, pageSize, sortField, sortOrder);
    }

    let httpParams = this.getDefaultsHttpParams(pageIndex, pageSize)
      .append('signatureType.isProtected', '0');

    // Sort
    if (sortField && sortOrder) {
      sortField = this.replaceByEntityField(sortField);
      httpParams = httpParams.append('sort', `${sortField},${sortOrder}`);
    }

    // Filters
    httpParams = this.addFiltersToHttpParams(filters, httpParams);

    return this.http.get<any>(`${this.apiUrl}admin/requests`, {params: httpParams});
  }

  /**
   * Get Request by id
   */
  public getRequest(id: number = 0): Observable<any> {
    if (!id) {
      throw new Error(this.emptyRequestIdError);
    }
    return this.http.get<any>(`${this.apiUrl}admin/requests/${id}`);
  }

  /**
   * Updates an existing Request
   */
  public update(request: Request, requestAssociationArrays: RequestAssociationArrays): Observable<any> {

    if (!request) {
      throw new Error(this.emptyRequestError);
    }

    // Copy from Request to NewRequestInput all the properties that exist also in NewRequestInput
    const updateRequestInput: UpdateRequestInput = new UpdateRequestInput();
    Object.keys(updateRequestInput).forEach(key => {
      // copy only the non array fields
      if (updateRequestInput[key] instanceof Array === false) {
        updateRequestInput[key] = request[key];
      }
    });

    // For some reason the REST API doesn't accept directly this date object without being formatted into string
    updateRequestInput.deadline = DateUtils.formatDateForRestDateObject(updateRequestInput.deadline);

    updateRequestInput.requestor = this.authenticationService.getUsername();
    updateRequestInput.externalApplication = this.externalApplication; // "DISP-Client";

    updateRequestInput.document = new UpdateDocumentInput();
    if (request.document && request.document.data) {
      updateRequestInput.document.mimetype = request.document.mimetype;
      updateRequestInput.document.title = request.document.title;
      updateRequestInput.document.size = request.document.size;
      updateRequestInput.document.filename = request.document.filename;
      // To remove the prefix
      if (request.document.data.startsWith('data:')) {
        updateRequestInput.document.data = request.document.data.substr(`data:${request.document.mimetype};base64,`.length);
      } else {
        updateRequestInput.document.data = request.document.data;
      }

    }

    updateRequestInput.metadata = {};
    updateRequestInput.metadatax = this.getRequestMetadatax(requestAssociationArrays.metadata);
    updateRequestInput.assignments = this.getRequestAssignments(requestAssociationArrays.signatories);
    updateRequestInput.associations = this.getRequestAssociations(requestAssociationArrays.securityAndRoles);

    if (updateRequestInput.associations !== null) {
      return this.http.put<any>(`${this.apiUrl}admin/requests/${request.id}`, updateRequestInput);
    }

    // We got an error, therefore we don't want to proceed with the save
    return throwError('Invalid User Roles');
  }

  /**
   * Creates a new Request
   */
  public create(request: Request, requestAssociationArrays: RequestAssociationArrays): Observable<any> {

    if (!request) {
      throw new Error(this.emptyRequestError);
    }

    // Copy from Request to NewRequestInput all the properties that exist also in NewRequestInput
    const newRequestInput: NewRequestInput = new NewRequestInput();
    Object.keys(newRequestInput).forEach(key => {
      // copy only the non array fields
      if (newRequestInput[key] instanceof Array === false) {
        newRequestInput[key] = request[key];
      }
    });

    // For some reason the REST API doesn't accept directly this date object without being formatted into string
    newRequestInput.deadline = DateUtils.formatDateForRestDateObject(newRequestInput.deadline);

    newRequestInput.requestor = this.authenticationService.getUsername();
    newRequestInput.externalApplication = this.externalApplication; // "DISP-Client";

    newRequestInput.document = new NewDocumentInput();
    if (request.document) {
      newRequestInput.document.mimetype = request.document.mimetype;
      newRequestInput.document.title = request.document.title;
      newRequestInput.document.size = request.document.size;
      newRequestInput.document.filename = request.document.filename;
      // To remove the prefix
      newRequestInput.document.data = request.document.data.substr(`data:${request.document.mimetype};base64,`.length);
    }

    newRequestInput.metadata = {};
    newRequestInput.metadatax = this.getRequestMetadatax(requestAssociationArrays.metadata);
    newRequestInput.assignments = this.getRequestAssignments(requestAssociationArrays.signatories);
    newRequestInput.associations = this.getRequestAssociations(requestAssociationArrays.securityAndRoles);

    if (newRequestInput.associations !== null) {
      return this.http.post<any>(`${this.apiUrl}admin/requests`, newRequestInput);
    }

    // We got an error, therefore we don't want to proceed with the save
    return throwError('Invalid User Roles');
  }

  /**
   * Returns either a list of NewAssignmentInput or UpdateAssignmentInput
   */
  private getRequestAssignments(signatories: PersonOption[]): any[] {
    const assignments: any[] = []; // Of type NewAssignmentInput

    if (signatories) {

      signatories.forEach(signatory => {
        assignments.push(
          {
            signatory: signatory.username,
            deadline: DateUtils.formatDateForRestDateObject(DateUtils.getEndOfTheDay(signatory.deadline)),
            order: assignments.length + 1
          }
        );
      });

    }
    return assignments;
  }

  /**
   * Returns either a list of NewAssociationInput or UpdateAssociationInput
   */
  private getRequestAssociations(securityAndRoles: PersonOption[]): any[] {
    const associations: any[] = []; // Of type NewAssociationInput
    let hasErrors: boolean = false; // It's only valid if at least one role is active, otherwise the user forgot to select a role
    let isValid: boolean = false; // It's only valid if at least one role is active, otherwise the user forgot to select a role

    // Security And Roles
    if (securityAndRoles) {
      securityAndRoles.forEach(securityAndRole => {
        isValid = false;
        securityAndRole.roles.forEach(roleItem => {
          if (roleItem.active) {
            isValid = true;
            associations.push(
              {
                user: securityAndRole.username,
                roleInRequest: roleItem.role
              }
            );
          }
        });
        if (!isValid) {
          this.globalService.showMessage(
            MessageSeverity.ERROR,
            'EDIT_TEMPLATE.ERROR.SECURITY_AND_ROLES.SAVE',
            '',
            {user: securityAndRole.username});

          hasErrors = true;
        }
      });
    }

    return !hasErrors ? associations : null;
  }

  public getSignatoriesForList(request: Request): PersonOption[] {
    const signatories: PersonOption[] = [];

    if (request && request.assignments) {
      request.assignments.forEach((assignment: Assignment) => {
        const personOption: PersonOption = this.getNewPersonOption(assignment);
        personOption.roles.push({role: SecurityRole.ROLE_SIGNATORY, active: true});
        signatories.push(personOption);
      });
    }

    return signatories;
  }

  public getSecurityAndRolesForList(request: Request, rolesPerPerson: Map<string, string[]>): PersonOption[] {
    const securityAndRoles: PersonOption[] = [];
    const associationsAsMap: Map<string, Association[]> = request.associationsAsMap;

    if (associationsAsMap) {
      const associationsAsMapValues = Object.keys(associationsAsMap).map(key => {
        return associationsAsMap[key];
      });
      // Loop through ROLE_AS_CONSUMER, ROLE_AS_CREATOR, ROLE_AS_SIGNATORY
      associationsAsMapValues.forEach(associations => {
        if (associations) {
          // Loop through each user association
          associations.forEach((association: Association) => {
            this.activatePersonRole(securityAndRoles, association);
          });
        }
      });
    }

    return securityAndRoles;
  }

  activatePersonRole(personsList: PersonOption[], association: Association): void {
    let personOption: PersonOption = personsList.find(person => person.username === association.user.username);

    // If this person doesn't exist yet in the list, we create a new one and add it
    if (!personOption) {
      personOption = this.getNewPersonOption(association);
      personOption.roles = TemplateService.getSecurityRoles();

      personsList.push(personOption);
    }

    personOption.roles.forEach(item => {
      if (item.role === association.roleInRequest) {
        item.active = true;
      }
    });

  }

  getNewPersonOption(association: any): PersonOption {
    const personOption: PersonOption = new PersonOption();
    // association is from 1 of the following types: Association | Assignment
    const user: User = association.user ? association.user : association.signatory;

    personOption.epId = user.epId;
    personOption.label = user.fullName;
    personOption.username = user.username;
    if (association.deadline) {
      personOption.deadline = DateUtils.getDateObjectFromDateTimeString(association.deadline);
    }

    return personOption;
  }

  addRoleToPerson(person: string, role: string, rolesPerPerson: Map<string, string[]>) {
    // If it's the first role for this person
    if (!rolesPerPerson.has(person)) {
      rolesPerPerson.set(person, [role]);
    } else {
      const roles: string[] = rolesPerPerson.get(person);
      roles.push(role);
      rolesPerPerson.set(person, roles);
    }
  }

  private getRequestMetadatax(metadata: any[]): any[] {
    const newMetadatax: any = [];

    if (metadata) {
      metadata.forEach(item => {
        newMetadatax.push({metatype: item.metatype.name, value: item.value});
      });
    }

    return newMetadatax;
  }

  /**
   *  TODO: Later, these endpoints must be updated in order to be able to receive an array of ids to handle multiple requests at once
   */

  // Update Request Status
  public updateRequestsStatus(ids: string[], status: RequestStatuses): Array<Observable<any>> {
    if (!ids || ids.length === 0) {
      throw new Error(this.emptyRequestIdError);
    }

    const updateObservablesList: Array<Observable<any>> = [];

    ids.forEach(id => {
      updateObservablesList.push(this.http.post<any>(`${this.apiUrl}requests/${id}/status`, `"${status}"`));
    });

    return updateObservablesList;
  }

  public updateRequestBarcodeLocation(id: number, barcodeLocation: string): Observable<any> {
    if (!id) {
      throw new Error(this.emptyRequestIdError);
    }

    const updateBarcodeLocationInput: UpdateBarcodeLocationInput = new UpdateBarcodeLocationInput();
    updateBarcodeLocationInput.requestId = id;
    updateBarcodeLocationInput.barcodeLocation = barcodeLocation;

    return this.http.patch<any>(`${this.apiUrl}admin/requests/${id}/barcodelocation`, updateBarcodeLocationInput);
  }

  public archiveRequests(ids: string[]): Array<Observable<any>> {
    if (!ids || ids.length === 0) {
      throw new Error(this.emptyRequestIdError);
    }

    const archiveObservablesList: Array<Observable<any>> = [];

    ids.forEach(id => {
      const newRestPrincipalInput: NewRestPrincipalInput = new NewRestPrincipalInput();
      newRestPrincipalInput.username = this.authenticationService.getUsername();

      // Can't use .delete() instead, because of this bug: https://github.com/angular/angular/issues/19438
      archiveObservablesList.push(this.http.request<any>(
        'delete',
        `${this.apiUrl}admin/requests/${id}`,
        {body: newRestPrincipalInput}));
    });

    return archiveObservablesList;
  }

  public purgeRequests(ids: string[], comment: string = ' '): Array<Observable<any>> {
    if (!ids || ids.length === 0) {
      throw new Error(this.emptyRequestIdError);
    }

    const purgeObservablesList: Array<Observable<any>> = [];

    ids.forEach(id => {
      const newRestPrincipalInputPurgeRequest: NewRestPrincipalInputPurgeRequest = new NewRestPrincipalInputPurgeRequest();
      newRestPrincipalInputPurgeRequest.username = this.authenticationService.getUsername();
      newRestPrincipalInputPurgeRequest.comment = comment;

      // Can't use .delete() instead, because of this bug: https://github.com/angular/angular/issues/19438
      purgeObservablesList.push(this.http.request<any>(
        'delete',
        `${this.apiUrl}admin/requests/${id}/purge`,
        {body: newRestPrincipalInputPurgeRequest}));
    });

    return purgeObservablesList;
  }

  /**
   * Get the DocumentResponse that contains the Document objeect of an Request with it's ByteArray
   * @param id Request Id
   */
  public getRequestDocument(id: string): Observable<any> {
    if (!id) {
      throw new Error(this.emptyRequestIdError);
    }

    return this.http.get<any>(`${this.apiUrl}requests/${id}/document`);
  }

  public downloadRequestFile(id: string): Observable<any> {
    return this.getRequestDocument(id).pipe(
      tap(result => {
        if (result && result.content) {
          this.globalService.downloadFile(result.content.data, result.content.filename, result.content.mimetype);
        }
      })
    );
  }

  public downloadRequestsFile(ids: string[]): Array<Observable<any>> {
    if (!ids || ids.length === 0) {
      throw new Error(this.emptyRequestIdError);
    }

    const downloadRequestsObservablesList: Array<Observable<any>> = [];

    ids.forEach(id => {
      downloadRequestsObservablesList.push(this.http.get<any>(`${this.apiUrl}requests/${id}/document`));
    });

    return downloadRequestsObservablesList;
  }

  downloadZipFile(results: any[]): void {
    const documents: Document[] = results.map(result => {
      return result.content;
    });

    const filename: string = `documents_${this.authenticationService.getFullname()}.zip`;

    this.globalService.downloadZipFile(documents, filename);
  }

  public filterByDeadlineInterval(selectedDeadline: MyDeadlineTypes): FilterField[] {
    const searchedDeadline: FilterField[] = [];

    if (selectedDeadline) {
      // Convert selected deadline into search filter
      const currentDate: Date = new Date();
      let minDate: Date = new Date();
      let maxDate: Date = new Date();

      switch (selectedDeadline) {
        case MyDeadlineTypes.PLUSMINUSWEEK: {
          minDate = DateUtils.addDays(minDate, -7);
          maxDate = DateUtils.addDays(maxDate, 8);
          break;
        }
        case MyDeadlineTypes.PAST: {
          minDate = DateUtils.getMinDate();
          maxDate = currentDate;
          break;
        }
        case MyDeadlineTypes.FUTURE: {
          minDate = currentDate;
          maxDate = DateUtils.getMaxDate();
          break;
        }
        case MyDeadlineTypes.ALL: {
          break;
        }
        default: {
          break;
        }
      }

      // To get all results we don't need to add any deadline filter
      if (selectedDeadline !== MyDeadlineTypes.ALL) {
        searchedDeadline.push(DateUtils.getFilterByDate(minDate, 'deadline'));
        searchedDeadline.push(DateUtils.getFilterByDate(maxDate, 'deadline'));
      }
    }

    return searchedDeadline;
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
      case 'externalApplication.name': {
        field = 'extApp.name';
        break;
      }
      default: {
        break;
      }
    }

    return field;
  }

  protected replaceByEntityFieldMyRequests(field: string): string {
    // Fix because the 'creationDate' in the Java Model has the name 'dateCreated' in the Java Entity
    switch (field) {
      case 'creationDate': {
        field = 'r.dateCreated';
        break;
      }
      case 'id': {
        field = 'r.id';
        break;
      }
      case 'documentTitle': {
        field = 'r.document.title';
        break;
      }
      case 'lotName': {
        field = 'r.lot.lotName';
        break;
      }
      case 'deadline': {
        field = 'r.deadline';
        break;
      }
      case 'status': {
        field = 'r.status';
        break;
      }
      default: {
        break;
      }
    }

    return field;
  }

  public isRequestSelectionValid(action: RequestActions, requestSelection: RequestSelection): boolean {
    let isValid: boolean = true;

    if (requestSelection.requests && requestSelection.requests.length > 0) {

      switch (action) {
        case RequestActions.EDIT: {
          // Only one request can be selected
          isValid = requestSelection.ids.length === 1 &&
            (requestSelection.requests[0].status === RequestStatuses.DRAFT ||
              requestSelection.requests[0].status === RequestStatuses.SENT);
          break;
        }
        case RequestActions.SEND: {
          // Only status DRAFT is permitted
          isValid = !requestSelection.requests.some(request =>
            request.status !== RequestStatuses.DRAFT
          );
          break;
        }
        case RequestActions.CANCEL: {
          // Only status DRAFT, SENT or ONGOING are permitted
          isValid = !requestSelection.requests.some(request =>
            request.status !== RequestStatuses.DRAFT &&
            request.status !== RequestStatuses.SENT &&
            request.status !== RequestStatuses.ONGOING
          );
          break;
        }
        case RequestActions.ARCHIVE: {
          // Only status CANCELED or COMPLETED are permitted and NON ARCHIVED requests
          isValid = !requestSelection.requests.some(request =>
            (request.status !== RequestStatuses.CANCELED &&
              request.status !== RequestStatuses.COMPLETED) || request.archive
          );
          break;
        }
        case RequestActions.PURGE: {
          // Only status CANCELED or COMPLETED are permitted
          isValid = !requestSelection.requests.some(request =>
            request.status !== RequestStatuses.CANCELED &&
            request.status !== RequestStatuses.COMPLETED
          );
          break;
        }
        default: {
          break;
        }
      }

      // There are selected requests with an invalid status for the action
      if (!isValid) {
        this.globalService.showMessage(MessageSeverity.INFO, `REQUESTS_TABLE.ERROR.${action}.STATUS`);
      }

    } else { // No requests were selected
      isValid = false;
      this.globalService.showMessage(MessageSeverity.INFO, `REQUESTS_TABLE.ERROR.${action}.SELECTION`);
    }

    return isValid;
  }

  public clearSelectedRequests() {
    // Notifies whoever is listening to this event that we want to desselect all requests
    this.requestSelectionChange$.next({requests: [], ids: []});
  }

  /**
   * Get Request with original document data by id
   */
  public findOriginalVersionOfTheDocumentByRequestId(id: number): Observable<any> {
    if (!id) {
      throw new Error(this.emptyRequestIdError);
    }
    return this.http.get<any>(`${this.apiUrl}admin/requests/${id}/document/originalVersion`);

  }

  /**
   * Get Request with last signed document data by id
   */
  public findLatestVersionOfTheDocumentByRequestId(id: number): Observable<any> {
    if (!id) {
      throw new Error(this.emptyRequestIdError);
    }
    return this.http.get<any>(`${this.apiUrl}admin/requests/${id}/document/latestVersion`);
  }

}
