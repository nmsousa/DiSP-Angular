import { Component, EventEmitter, Injector, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { finalize, map } from 'rxjs/operators';

import { AutocompleteOption } from '../../models/autocomplete-option';
import { Request } from '../../models/entities/request.model';
import { AssignmentStatuses } from '../../models/enums/assignment-statuses.enum';
import { MyDeadlineTypes } from '../../models/enums/my-deadline-types.enum';
import { RequestStatuses } from '../../models/enums/request-statuses.enum';
import { FilterField } from '../../models/filter-field';
import { RequestSelection } from '../../models/request-selection';
import { SortConfig, SortOrder } from '../../models/sort-config';
import { TableColumn, TableColumnType } from '../../models/table-column';
import { RequestService } from '../../services/request.service';
import { BaseTableComponent } from '../base-table.component';

@Component({
  selector: 'app-requests-table',
  templateUrl: './requests-table.component.html',
  styleUrls: ['./requests-table.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class RequestsTableComponent extends BaseTableComponent implements OnInit, OnDestroy {

  @Output() loaded: EventEmitter<boolean> = new EventEmitter();

  @Input() records: Array<{ links: [], content: Request }> = [];
  @Input() columns: TableColumn;
  @Input() hasFiltersToolbar: boolean = true;
  @Input() showBottomPaginator: boolean = true;
  @Input() showOnlyMyRequests: boolean = false;

  // sortConfig

  private _sortConfig: SortConfig | null = null;
  @Input()
  set sortConfig(sortConfig: SortConfig | null) {
    this._sortConfig = sortConfig;
    this.sortOrder = sortConfig.sortOrder;
    this.sortField = sortConfig.sortField;
  }
  get sortConfig(): SortConfig | null {
    return this._sortConfig;
  }

  /* customFilters */

  private _customFilters: FilterField[] = [];
  @Input()
  set customFilters(customFilters: FilterField[]) {
    this._customFilters = customFilters;
    if (this._customFilters) {
      this.searchRecords(true);
    }
  }
  get customFilters(): FilterField[] {
    return this._customFilters || [];
  }

  // Enums

  RequestStatuses = RequestStatuses;
  TableColumnType = TableColumnType;
  MyDeadlineTypes = MyDeadlineTypes;

  // Selection column checkbox

  hasAllRecordsChecked: boolean;
  hasSomeRecordsChecked: boolean;
  // List of selected Records
  mapOfCheckedId: { [key: string]: boolean } = {};

  // Filters

  searchedStatuses: FilterField[] = [];
  searchedDeadline: FilterField[] = [];
  searchedLots: FilterField[] = [];
  selectedDeadlineFilter: MyDeadlineTypes;
  hasAllStatusFiltered = false;
  hasSomeStatusFiltered = false;
  statusFilterList = [
    { label: 'REQUESTSTATUS.DRAFT', value: RequestStatuses.DRAFT, checked: false },
    { label: 'REQUESTSTATUS.SENT', value: RequestStatuses.SENT, checked: false },
    { label: 'REQUESTSTATUS.ONGOING', value: RequestStatuses.ONGOING, checked: false },
    { label: 'REQUESTSTATUS.COMPLETED', value: RequestStatuses.COMPLETED, checked: false },
    { label: 'REQUESTSTATUS.CANCELED', value: RequestStatuses.CANCELED, checked: false }
  ];

  constructor(
    injector: Injector,
    private requestService: RequestService) {

    super(injector);
  }

  ngOnInit() {
    // When we are passing the filters from outside, we wont be needing this
    if (this.hasFiltersToolbar) {
      this.searchRecords();
    }

    // We listen for changes that might have happened to the requests, for example, executing Purge or Archive actions
    this.subscriptions.push(this.requestService.requestsChanged$.subscribe(() => {
      this.searchRecords();
    }));
  }

  sort(sort: { key: string; value: string }): void {
    // If the user removed the sort, we go back to the default sort if there is any
    if (!sort.value) {
      this.sortField = this.sortConfig.sortField;
      this.sortOrder = this.sortConfig.sortOrder;
    } else {
      this.sortField = sort.key;
      this.sortOrder = sort.value === 'descend' ? SortOrder.DESC : SortOrder.ASC;
    }

    this.searchRecords();
  }

  /* REQUESTS FILTERS */

  filterByStatus(listOfSelectedStatus: string[]): void {
    this.searchedStatuses = [];

    listOfSelectedStatus.forEach(selectedStatus => {
      this.searchedStatuses.push({text: this.showOnlyMyRequests ? 'requestStatus' : 'status', value: selectedStatus});
    });

    this.searchRecords(true);
  }

  updateAllStatusChecked(): void {
    this.hasSomeStatusFiltered = false;
    if (this.hasAllStatusFiltered) {
      this.statusFilterList = this.statusFilterList.map(item => {
        return {
          ...item,
          checked: true
        };
      });
    } else {
      this.statusFilterList = this.statusFilterList.map(item => {
        return {
          ...item,
          checked: false
        };
      });
    }

    this.filterByStatus(this.getSelectedStatusFilter());
  }

  updateSingleStatusChecked(): void {
    if (this.statusFilterList.every(item => !item.checked)) {
      this.hasAllStatusFiltered = false;
      this.hasSomeStatusFiltered = false;
    } else if (this.statusFilterList.every(item => item.checked)) {
      this.hasAllStatusFiltered = true;
      this.hasSomeStatusFiltered = false;
    } else {
      this.hasSomeStatusFiltered = true;
    }

    this.filterByStatus(this.getSelectedStatusFilter());
  }

  getSelectedStatusFilter(): string[] {
    // Run the request search with the selected statuses
    return this.statusFilterList.filter(item => item.checked).map(item => item.value);
  }

  /* DEADLINE FILTER */

  filterByDeadline(selectedDeadline: MyDeadlineTypes): void {
    if (!this.showOnlyMyRequests) {
      this.searchedDeadline = this.requestService.filterByDeadlineInterval(selectedDeadline);
    } else {
      this.searchedDeadline = [{text: 'myDeadlineTypes', value: selectedDeadline}];
    }

    this.searchRecords(true);
  }

  /* LOTS FILTER */

  filterByLot(event: AutocompleteOption): void {
    this.searchedLots = [{text: this.showOnlyMyRequests ? 'lotId' : 'lot.id', value: event.id}];

    this.searchRecords(true);
  }

  clearLotRef() {
    this.searchedLots = []; // Clear the previous, in case we do another server call for Requests, we ain't sending the old lot ref

    this.searchRecords(true);
  }

  searchRecords(clearPageIndex: boolean = false): void {
    this.isLoading = true;

    // Every time we do a new search, we clear the previous selection of requests
    this.mapOfCheckedId = {};
    this.records = [];

    super.searchRecords(clearPageIndex);

    this.subscriptions.push(this.requestService
      .getRequests(
        [...this.searchedStatuses, ...this.searchedDeadline, ...this.searchedLots, ...this.customFilters],
        this.pageIndex - 1, this.pageSize,
        this.sortField, this.sortOrder, this.showOnlyMyRequests
      )
      .pipe(
        map(result => {
          this.totalRecords = result.page.totalElements;

          // We want to provide clean Requests to the request-table-content, therefore here we remove the rest response wrapper
          const requests: Request[] = [];
          result.content.forEach(element => {
            requests.push(element.content);
          });

          return requests;
        }),
        finalize(() => {
          this.isLoading = false;
          this.loaded.emit(true);
        })
      )
      .subscribe(
        (data: any) => {
          this.records = data;
        }
      )
    );

  }

  onCheckedChange(selectedRequests: RequestSelection) {
    // Get the list of the selectedRequests and notify the service about it, so it can inform the components that might have subscribed it
    this.requestService.requestSelectionChange$.next(selectedRequests);
  }

  getSignedAmount(request: Request) {
    let count: number = 0;

    if (request.assignments) {
      count = request.assignments.filter(assignment => {
        return assignment.status === AssignmentStatuses.SIGNED;
      }).length;
    }

    return count;
  }

}
