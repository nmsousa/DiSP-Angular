import { HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { ErrorInterceptorSkipHeader } from '../../core/interceptors/error-handler.interceptor';
import { FilterField } from '../models/filter-field';
import { SortOrder } from '../models/sort-config';
import { BACKEND_PAGINATION_DEFAULT, BaseRemoteService } from './base-remote.service';

@Injectable({
  providedIn: 'root'
})
export class LotService extends BaseRemoteService {

  constructor(injector: Injector) {
    super(injector);
  }

  // Get the Lots from the API
  public getLots(
    filters: FilterField[] = null,
    pageIndex: number = 0,
    pageSize: number = BACKEND_PAGINATION_DEFAULT,
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

    return this.http.get<any>(`${this.apiUrl}admin/lots`, {params: httpParams, headers: skipErrorHeaders});
  }

}
