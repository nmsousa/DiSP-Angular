import { Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, ValidatorFn } from '@angular/forms';
import { AccordionComponent } from 'ep-ng-lib';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { BaseTableComponent } from '../base-table.component';
import { FilterField } from './../../models/filter-field';
import { SortOrder } from './../../models/sort-config';
import { DateUtils } from './../../utils/date.utils';
import { BaseAuditingService } from './base-auditing.service';

export const CustomDateRangeValidator: ValidatorFn = (fg: FormGroup) => {
  const start = fg.get('occurredDate_From').value;
  const end = fg.get('occurredDate_To').value;
  return DateUtils.isDateRangeValid(start, end) ? {} : {dateRangeError: true, error: true};
};

export abstract class BaseAuditingComponent extends BaseTableComponent implements OnInit, OnDestroy {

  @ViewChild('searchCriteriaAccordion', { static: false })
  protected searchCriteriaAccordion: AccordionComponent;
  @ViewChild('resultsAccordion', { static: false })
  protected resultsAccordion: AccordionComponent;

  subscriptions: Subscription[] = [];
  searchForm: FormGroup;
  filters: FilterField[];
  audits: Array<{ links: [], content: any }> = [];

  disableFutureDates = (current: Date): boolean => {
    // Can not select days before today and today
    return DateUtils.isFutureDate(current);
  }

  constructor(
    injector: Injector,
    public service: BaseAuditingService) {

    super(injector);
   }

  ngOnInit() {
    this.createSearchForm();
  }

  // To be overrided
  createSearchForm(): void { }

  onClearSearch(): void {
    this.searchForm.reset();
    this.filters = [];
  }

  onSearch(): void {
    this.searchRecords(true);
  }

  searchRecords(clearPageIndex: boolean = false): void {
    this.searchCriteriaAccordion.collapse();
    this.resultsAccordion.uncollapse();

    super.searchRecords(clearPageIndex);

    this.getAuditings();
  }

  getAuditings(): void {
    this.audits = [];
    this.isLoading = true;

    this.subscriptions.push(this.service
      .getAuditings(this.getFilters(), this.pageIndex - 1, this.pageSize, this.sortField, this.sortOrder)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data: any) => {
          this.totalRecords = data.page.totalElements;
          this.audits = data.content;
        }
      )
    );
  }

  // To be overrided
  getFilters(): any { }

  // To be overrided
  onExport(filters: any): void {
    this.subscriptions.push(this.service.exportAuditings(filters).subscribe());
  }

}
