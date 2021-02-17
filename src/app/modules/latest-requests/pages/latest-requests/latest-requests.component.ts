import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { BaseTableComponent } from 'src/app/shared/components/base-table.component';

import { Request } from '../../../../shared/models/entities/request.model';
import { SortConfig, SortOrder } from '../../../../shared/models/sort-config';
import { TableColumn, TableColumnType } from '../../../../shared/models/table-column';
import { RequestService } from './../../../../shared/services/request.service';

@Component({
  selector: 'app-latest-requests',
  templateUrl: './latest-requests.component.html',
  styleUrls: ['./latest-requests.component.less']
})
export class LatestRequestsComponent extends BaseTableComponent implements OnInit, OnDestroy {

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
      { field: 'document.title', label: 'REQUESTS_TABLE.HEADER.TITLE', type: TableColumnType.STRING },
      { field: 'externalApplication.name', label: 'REQUESTS_TABLE.HEADER.FROM', type: TableColumnType.FROM, width: '200px'},
      { field: 'externalApplication.name', label: 'REQUESTS_TABLE.HEADER.SIGNED', type: TableColumnType.SIGNED },
      { field: 'deadline', label: 'REQUESTS_TABLE.HEADER.DEADLINE', type: TableColumnType.DATE, width: '120px' },
      { field: 'status', label: 'REQUESTS_TABLE.HEADER.STATUS', type: TableColumnType.STATUS, width: '120px' },
      { field: 'lot.lotName', label: 'REQUESTS_TABLE.HEADER.LOTNAME', type: TableColumnType.NUMBER },
      { field: 'archive', label: 'REQUESTS_TABLE.HEADER.ARCHIVED', type: TableColumnType.ARCHIVED_PURGED, width: '100px' }
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
