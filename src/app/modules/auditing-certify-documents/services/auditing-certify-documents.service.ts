import { HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { BaseAuditingService } from './../../../shared/components/auditing/base-auditing.service';
import { FilterField } from './../../../shared/models/filter-field';
import { SortOrder } from './../../../shared/models/sort-config';
import { BACKEND_PAGINATION_DEFAULT, BaseRemoteService } from './../../../shared/services/base-remote.service';
import { GlobalService } from './../../../shared/services/global.service';

@Injectable({
  providedIn: 'root'
})
export class AuditingCertifyDocumentsService extends BaseRemoteService implements BaseAuditingService {

  constructor(injector: Injector, private globalService: GlobalService) {
    super(injector);
  }

  getAuditings(
    filters: FilterField[] = null,
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
    if (filters) {
      filters.forEach(filter => {
        filter.text = this.replaceByEntityField(filter.text);
      });
    }
    httpParams = this.addFiltersToHttpParams(filters, httpParams);

    return this.http.get<any>(`${this.apiUrl}admin/auditingCertifyDoc`, {params: httpParams});
  }

  exportAuditings(filters: FilterField[] = null): Observable<any> {
    // Filters
    if (filters) {
      filters.forEach(filter => {
        filter.text = this.replaceByEntityField(filter.text);
      });
    }
    let httpParams = new HttpParams();
    httpParams = this.addFiltersToHttpParams(filters, httpParams);

    return this.http.get<any>(`${this.apiUrl}admin/auditingCertifyDoc/export`, {params: httpParams}).pipe(
      tap(result => {
        if (result && result.content) {
          // Save locally the excel file
          this.globalService.downloadFile(result.content.data, result.content.filename, result.content.mimetype);
        }
      }));
  }

  /**
   * When a property has a different name in the Model other than the one in the Entity
   * @param field property to check if we need to rename
   */
  protected replaceByEntityField(field: string): string {
    // Fix because the 'occurredDate' in the Java Model has the name 'dateOccured' in the Java Entity
    switch (field) {
      case 'occurredDate':
        field = 'dateOccured';
        break;
      default: {
        break;
      }
    }

    return field;
  }

}
