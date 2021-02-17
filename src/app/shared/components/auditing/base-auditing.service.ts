import { Observable } from 'rxjs';

import { SortOrder } from './../../models/sort-config';

export interface BaseAuditingService {

    getAuditings(
      filters: any, pageIndex: number, pageSize: number, sortField: string, sortOrder: SortOrder
    ): Observable<any>;

    exportAuditings(formValue: any): Observable<any>;
}
