import { Injector, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

import { SortOrder } from './../models/sort-config';
import { BACKEND_PAGINATION_MINIMUM } from './../services/base-remote.service';

export abstract class BaseTableComponent implements OnDestroy {

  protected authenticationService: AuthenticationService;
  stop$ = new Subject();

  subscriptions: Subscription[] = [];

  // Table configuration

  isLoading: boolean = false;
  totalRecords: number = 1;
  pageIndex: number = 1;
  pageSize: number = BACKEND_PAGINATION_MINIMUM;
  sortOrder: SortOrder | null = null;
  sortField: string | null = null;

  constructor(injectorObj: Injector) {
    this.authenticationService = injectorObj.get(AuthenticationService);

    this.getPageSize();
  }

  getPageSize(): void {
    if (this.authenticationService.currentUser) {
      this.pageSize = this.authenticationService.currentUser.preferences.recordsPerPage;
    } else {
      //  We subscribe to the role$ to know if the user changed and with it, the preferences
      this.authenticationService.role$.pipe(
        takeUntil(this.stop$)
      ).subscribe(() => {
        this.pageSize = this.authenticationService.currentUser.preferences.recordsPerPage;
      });
    }
  }

  onSearch(): void {
    this.searchRecords(true);
  }

  pageIndexChange(event: number): void {
    this.pageIndex = event;

    this.searchRecords();
  }

  pageSizeChange(event: number): void {
    this.pageSize = event;

    this.searchRecords(true);
  }

  sort(sort: { key: string; value: string }): void {
    // If the user removed the sort, we go back to the default sort if there is any
    if (!sort.value) {
      this.sortField = null;
      this.sortOrder = null;
    } else {
      this.sortField = sort.key;
      this.sortOrder = sort.value === 'descend' ? SortOrder.DESC : SortOrder.ASC;
    }

    this.searchRecords();
  }

  /**
   * To be overrided
   * @param clearPageIndex Indicates that we want to reset the page, for example, if we changed the filter
   */
  protected searchRecords(clearPageIndex: boolean = false): void {
    if (clearPageIndex) {
      this.pageIndex = 1;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
