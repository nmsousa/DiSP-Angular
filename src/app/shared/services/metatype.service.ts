import { HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { FilterField } from '../models/filter-field';
import { SortOrder } from '../models/sort-config';
import { ErrorInterceptorSkipHeader } from './../../core/interceptors/error-handler.interceptor';
import { BaseRemoteService } from './base-remote.service';

@Injectable({
  providedIn: 'root'
})
export class MetatypeService extends BaseRemoteService {

  constructor(injector: Injector) {
    super(injector);
  }

  public getMetatypes(
    filters: FilterField[] = null,
    pageIndex: number = 0,
    pageSize: number = 0,
    sortField: string = null,
    sortOrder: SortOrder = SortOrder.ASC
  ): Observable<any> {

    let httpParams = this.getDefaultsHttpParams(pageIndex, pageSize);

    // Sort
    if (sortField && sortOrder) {
      httpParams = httpParams.append('sort', `${sortField},${sortOrder}`);
    }

    // Filters
    httpParams = this.addFiltersToHttpParams(filters, httpParams);

    // Skip any possible error messages
    const skipErrorHeaders = new HttpHeaders().set(ErrorInterceptorSkipHeader, '');

    return this.http.get<any>(`${this.apiUrl}admin/metatypes`, {params: httpParams, headers: skipErrorHeaders});
  }

}
