import { Component, Injector, Input, OnInit } from '@angular/core';

import { RequestStatuses } from '../../models/enums/request-statuses.enum';
import { TableColumn, TableColumnType } from '../../models/table-column';
import { GetCellDataPipe } from '../../pipes/cell-data.pipe';
import { BaseTableComponent } from '../base-table.component';

@Component({
  selector: 'app-lot-requests-table',
  templateUrl: './lot-requests-table.component.html',
  styleUrls: ['./lot-requests-table.component.less']
})
export class LotRequestsTableComponent extends BaseTableComponent implements OnInit {

  /* requests */
  tableRequests: any[];

  private _requests: any[] = [];
  @Input()
  set requests(requests: any[]) {
    this._requests = requests;
    // Sort the initial received array by creationDate DESC
    if (requests) {
      // Because if we have repeated Requestors, only the first one contains the full User object,
      // the following ones only have an id pointing to a Requestor @jsonTag
      // TODO: Check if this will be fixed on the server side:
      // this.fillEmptyRequestors(requests);

      this.tableRequests = requests.sort((a, b) => {
        return b['creationDate'] - a['creationDate'];
      }).slice(0, this.pageSize);
      this.totalRecords = requests.length;
    }
  }
  get requests(): any[] {
    return this._requests || [];
  }

  @Input() externalApplication: string = '';

  getCellDataPipe: GetCellDataPipe = new GetCellDataPipe();

  // Enums

  RequestStatuses = RequestStatuses;

  columns: TableColumn[] = [
    { field: 'id', label: 'REQUESTS_TABLE.HEADER.ID', type: TableColumnType.ID, width: '90px' },
    { field: 'document.title', label: 'REQUESTS_TABLE.HEADER.TITLE', type: TableColumnType.STRING },
    { field: 'externalApplication.name', label: 'REQUESTS_TABLE.HEADER.FROM', type: TableColumnType.FROM, width: '200px'},
    { field: 'requestor.id', label: 'REQUESTS_TABLE.HEADER.SIGNED', type: TableColumnType.SIGNED },
    { field: 'deadline', label: 'REQUESTS_TABLE.HEADER.DEADLINE', type: TableColumnType.DATE, width: '120px' },
    { field: 'status', label: 'REQUESTS_TABLE.HEADER.STATUS', type: TableColumnType.STATUS, width: '120px' },
    { field: 'archive', label: 'REQUESTS_TABLE.HEADER.ARCHIVED', type: TableColumnType.ARCHIVED_PURGED, width: '100px' }
  ];

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
  }

  // fillEmptyRequestors(requests: any[]): void {
  //   const requestorsMap: Map<number, any> = new Map();
  //   requests.forEach(request => {
  //     // It's a complete Requestor (User entity) instead of being just a pointer to a complete one
  //     if (request.requestor.hasOwnProperty('@jsonTag')) {
  //       requestorsMap.set(request.requestor['@jsonTag'], request.requestor);
  //     } else {
  //       request.requestor = requestorsMap.get(request.requestor);
  //     }
  //   });
  // }

  searchRecords(clearPageIndex: boolean = false): void {
    super.searchRecords(clearPageIndex);
    const startPage: number = (this.pageIndex - 1)  * this.pageSize;
    this.tableRequests = this.requests.slice(startPage, this.pageSize + startPage);
  }

  sort(sort: { key: string; value: string }): void {
    this.tableRequests = this.requests.sort((a, b) =>
      sort.value  === 'ascend'
        ? this.getCellDataPipe.transform(a, sort.key) > this.getCellDataPipe.transform(b, sort.key)
        ? 1
        : -1
        : this.getCellDataPipe.transform(b, sort.key) > this.getCellDataPipe.transform(a, sort.key)
        ? 1
        : -1
    );

    this.searchRecords();
  }

}
