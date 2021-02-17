import { Component, Injector, OnInit } from '@angular/core';
import { BaseTableComponent } from 'src/app/shared/components/base-table.component';

import { SortConfig, SortOrder } from './../../../../shared/models/sort-config';
import { TableColumn, TableColumnType } from './../../../../shared/models/table-column';
import { RequestService } from './../../../../shared/services/request.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.less']
})
export class RequestsComponent extends BaseTableComponent implements OnInit {

  requests: Array<{ links: [], content: Request }> = [];
  columns: TableColumn[] = [];
  sortConfig: SortConfig = { sortField: 'creationDate', sortOrder: SortOrder.DESC };
  showSingleGrouping: boolean = true;

  constructor(
    injector: Injector,
    private requestService: RequestService) {

    super(injector);
   }

  ngOnInit(): void {
    this.generateColumns();
  }

  private generateColumns(): void {
    this.columns = [
      { field: 'id', label: 'REQUESTS_TABLE.HEADER.ID', type: TableColumnType.ID, width: '90px' },
      { field: 'documentTitle', label: 'REQUESTS_TABLE.HEADER.TITLE', type: TableColumnType.STRING },
      { field: 'deadline', label: 'REQUESTS_TABLE.HEADER.DEADLINE', type: TableColumnType.DATE, width: '120px' },
      { field: 'status', label: 'REQUESTS_TABLE.HEADER.STATUS', type: TableColumnType.STATUS, width: '120px' },
      { field: 'lotName', label: 'REQUESTS_TABLE.HEADER.LOTNAME', type: TableColumnType.NUMBER, width: '100px' }
    ];
  }

  onGroupingViewClicked(): void {
    this.isLoading = true; // Is Loading ViewRecords
    this.showSingleGrouping = !this.showSingleGrouping;
    this.requestService.clearSelectedRequests();
  }

  onLoadedViewRecords() {
    this.isLoading = false;
  }

}
