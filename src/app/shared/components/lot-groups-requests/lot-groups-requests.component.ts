import { Component, EventEmitter, Injector, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BaseTableComponent } from 'src/app/shared/components/base-table.component';

import { AutocompleteOption } from '../../models/autocomplete-option';
import { FilterField } from '../../models/filter-field';
import { SortOrder } from '../../models/sort-config';
import { LotService } from '../../services/lot.service';

@Component({
  selector: 'app-lot-groups-requests',
  templateUrl: './lot-groups-requests.component.html',
  styleUrls: ['./lot-groups-requests.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class LotGroupsRequestsComponent extends BaseTableComponent implements OnInit, OnDestroy {

  @Output() loaded: EventEmitter<boolean> = new EventEmitter();

  lots: any[];
  filters: FilterField[] = [];

  constructor(
    injector: Injector,
    private lotService: LotService) {

    super(injector);
  }

  ngOnInit() {
    this.searchRecords();
  }

  searchRecords(clearPageIndex: boolean = false): void {
    super.searchRecords(clearPageIndex);

    this.isLoading = true;
    this.subscriptions.push(this.lotService.getLots(this.filters, this.pageIndex - 1, this.pageSize, 'id', SortOrder.DESC).pipe(
      finalize(() => {
        this.isLoading = false;
        this.loaded.emit(true);
      })
    )
      .subscribe(result => {
        this.lots = result.content;
        this.totalRecords = result.page.totalElements;
      }));
  }

  filterByLot(event: AutocompleteOption): void {
    this.filters = [{text: 'id', value: event.id}];

    this.searchRecords(true);
  }

  clearLotRef() {
    this.filters = []; // Clear the previous filters, in case we do another server call for Requests, we ain't sending the old lot ref

    this.searchRecords(true);
  }

}
