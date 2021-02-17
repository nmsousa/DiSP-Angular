import { HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ErrorInterceptorSkipHeader } from '../../../core/interceptors/error-handler.interceptor';
import { FilterField } from '../../../shared/models/filter-field';
import { NewAuditingExportInput } from '../../../shared/models/input/new-auditing-export-input.model';
import { SortOrder } from '../../../shared/models/sort-config';
import { BACKEND_PAGINATION_DEFAULT, BaseRemoteService } from '../../../shared/services/base-remote.service';
import { GlobalService } from '../../../shared/services/global.service';
import { DateUtils } from '../../../shared/utils/date.utils';
import { BaseAuditingService } from './../../../shared/components/auditing/base-auditing.service';

@Injectable({
  providedIn: 'root'
})
export class AuditingEventsService extends BaseRemoteService implements BaseAuditingService {

  constructor(injector: Injector, private globalService: GlobalService) {
    super(injector);
  }

  getAuditings(
    formValue: any = [],
    pageIndex: number = 0,
    pageSize: number = BACKEND_PAGINATION_DEFAULT,
    sortField: string = '',
    sortOrder: SortOrder = SortOrder.ASC): Observable<any> {

    let httpParams = this.getDefaultsHttpParams(pageIndex, pageSize);

    // Sort
    if (sortField && sortOrder) {
      sortField = this.replaceByEntityField(sortField);
      httpParams = httpParams.append('sort', `${sortField},${sortOrder}`);
    }

    // Filters
    const newAuditingExportInput: NewAuditingExportInput = this.getNewAuditingExportInputFromFilters(formValue);

    return this.http.post<any>(`${this.apiUrl}admin/auditingEvents`, newAuditingExportInput, {params: httpParams});
  }

  getAuditingEventTypes(
    filters: FilterField[] = null,
    pageIndex: number = 0,
    pageSize: number = BACKEND_PAGINATION_DEFAULT): Observable<any> {

    let httpParams = this.getDefaultsHttpParams(pageIndex, pageSize);

    // Filters
    httpParams = this.addFiltersToHttpParams(filters, httpParams);

    // Skip any possible error messages
    const skipErrorHeaders = new HttpHeaders().set(ErrorInterceptorSkipHeader, '');

    return this.http.get<any>(`${this.apiUrl}admin/auditingEventTypes`, {params: httpParams, headers: skipErrorHeaders});
  }

  exportAuditings(formValue: any): Observable<any> {
    // Filters
    const newAuditingExportInput: NewAuditingExportInput = this.getNewAuditingExportInputFromFilters(formValue);

    return this.http.post<any>(`${this.apiUrl}admin/auditingEvents/export`, newAuditingExportInput).pipe(
      tap(result => {
        if (result && result.content) {
          // Save locally the excel file
          this.globalService.downloadFile(result.content.data, result.content.filename, result.content.mimetype);
        }
      }));
  }

  private getNewAuditingExportInputFromFilters(formValue: any): NewAuditingExportInput {
    const newAuditingExportInput: NewAuditingExportInput = new NewAuditingExportInput();

    if (formValue) {
      newAuditingExportInput.startDate = DateUtils.formatDateForRestDateObject(formValue.occurredDate_From);
      newAuditingExportInput.endDate = DateUtils.formatDateForRestDateObject(formValue.occurredDate_To);
      newAuditingExportInput.username = formValue.username ? formValue.username.id : '';
      newAuditingExportInput.requestId = formValue.requestId;
      newAuditingExportInput.requestTitle = formValue.requestTitle;
      newAuditingExportInput.auditingEventTypeId = formValue['type.id'] ? formValue['type.id'].id : '';
    }

    return newAuditingExportInput;
  }

  /**
   * When a property has a different name in the Model other than the one in the Entity
   * @param field property to check if we need to rename
   */
  protected replaceByEntityField(field: string): string {
    // Fix because the 'occurredDate' in the Java Model has the name 'dateOccured' in the Java Entity
    switch (field) {
      case 'occurredDate':
        field = 'date_occured';
        break;
      case 'title':
        field = 'requestId';
        break;
      case 'level':
        field = 'auditing_event_level';
        break;
      case 'type.key':
        field = 'f_audit_type';
        break;
      default: {
        break;
      }
    }

    return field;
  }
}
