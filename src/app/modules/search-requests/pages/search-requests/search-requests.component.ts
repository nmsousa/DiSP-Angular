import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { AccordionComponent } from 'ep-ng-lib';
import { Subscription } from 'rxjs';

import { AssignmentStatuses } from '../../../../shared/models/enums/assignment-statuses.enum';
import { RequestStatuses } from '../../../../shared/models/enums/request-statuses.enum';
import { FilterField } from '../../../../shared/models/filter-field';
import { TableColumn, TableColumnType } from '../../../../shared/models/table-column';
import { DateUtils } from '../../../../shared/utils/date.utils';
import { PersonOption } from './../../../../shared/models/person-option';

const CustomDateRangeValidator: ValidatorFn = (fg: FormGroup) => {
  const result: any = {};
  const deadlineStart = fg.get('deadline_From').value;
  const deadlineEnd = fg.get('deadline_To').value;
  const dateCreatedStart = fg.get('dateCreated_From').value;
  const dateCreatedEnd = fg.get('dateCreated_To').value;

  if (!DateUtils.isDateRangeValid(deadlineStart, deadlineEnd)) {
    result.deadlineRangeError = true;
    result.error = true;
  }
  if (!DateUtils.isDateRangeValid(dateCreatedStart, dateCreatedEnd)) {
    result.dateCreatedRangeError = true;
    result.error = true;
  }

  return result;
};

@Component({
  selector: 'app-search-requests',
  templateUrl: './search-requests.component.html',
  styleUrls: ['./search-requests.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class SearchRequestsComponent implements OnInit, OnDestroy {

  @ViewChild('searchCriteriaAccordion', { static: false })
  private searchCriteriaAccordion: AccordionComponent;
  @ViewChild('resultsAccordion', { static: false })
  private resultsAccordion: AccordionComponent;

  subscriptions: Subscription[] = [];
  searchForm: FormGroup;
  requestFilters: FilterField[];

  /* Signatories */

  signatories: PersonOption[] = [];

  /* Statuses */

  RequestStatuses = RequestStatuses;
  AssignmentStatuses = AssignmentStatuses;

  archivedOptions: any[] = [
    {label: 'All', value: null},
    {label: 'Archived', value: true},
    {label: 'Not archived', value: false}
  ];

  purgedOptions: any[] = [
    {label: 'All', value: null},
    {label: 'Purged', value: true},
    {label: 'Not purged', value: false}
  ];

  columns: TableColumn[] = [
    { field: 'id', label: 'REQUESTS_TABLE.HEADER.ID', type: TableColumnType.ID, width: '90px' },
    { field: 'document.title', label: 'REQUESTS_TABLE.HEADER.TITLE', type: TableColumnType.STRING },
    { field: 'externalApplication.name', label: 'REQUESTS_TABLE.HEADER.FROM', type: TableColumnType.FROM, width: '200px'},
    { field: 'externalApplication.name', label: 'REQUESTS_TABLE.HEADER.SIGNED', type: TableColumnType.SIGNED },
    { field: 'deadline', label: 'REQUESTS_TABLE.HEADER.DEADLINE', type: TableColumnType.DATE, width: '120px' },
    { field: 'status', label: 'REQUESTS_TABLE.HEADER.STATUS', type: TableColumnType.STATUS, width: '120px' },
    { field: 'lot.lotName', label: 'REQUESTS_TABLE.HEADER.LOTNAME', type: TableColumnType.NUMBER },
    { field: 'archive', label: 'REQUESTS_TABLE.HEADER.ARCHIVED', type: TableColumnType.ARCHIVED_PURGED, width: '100px' }
    ];

  disableFutureDates = (current: Date): boolean => {
    // Can not select days before today and today
    return DateUtils.isFutureDate(current);
  }

  constructor(
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createSearchForm();
  }

  private createSearchForm() {
    this.searchForm = this.fb.group({
      'id': [null],
      'document.title': [null],
      'deadline_From': [null],
      'deadline_To': [null],
      'dateCreated_From': [null],
      'dateCreated_To': [null],
      'status': [null],
      'assignments.status': [null],
      'archive': [false],
      'purge': [false]
    }, { validator: CustomDateRangeValidator });
  }

  onArchivedChange(value: any) {
    this.searchForm.patchValue({ archive: value });
  }

  onPurgedChange(value: any) {
    this.searchForm.patchValue({ purge: value });
  }

  /* Global functionality */

  onClearSearch(): void {
    this.searchForm.reset();
    this.signatories = [];
    this.requestFilters = [];
  }

  onSearch(): void {
    const filters: FilterField[] = [];

    this.searchCriteriaAccordion.collapse();
    this.resultsAccordion.uncollapse();

    // Loop though the form controls and add to the filter the ones with value
    Object.keys(this.searchForm.controls).forEach(key => {
      if (this.searchForm.controls[key].value !== null) {
        switch (key) {
          case 'deadline_From':
          case 'deadline_To':
          case 'dateCreated_From':
          case 'dateCreated_To':
            filters.push(...DateUtils.getDateRangeFilters(this.searchForm, key));
            break;
          case 'status':
          case 'assignments.status':
            this.searchForm.controls[key].value.forEach(status => {
              filters.push({text: key, value: status});
            });
            break;
          default:
            filters.push({text: key, value: this.searchForm.controls[key].value});
            break;
        }
      }
    });

    // Add also the signatories filter
    if (this.signatories) {
      this.signatories.forEach(signatory => {
        filters.push({text: 'assignments.signatory.username', value: signatory.username});
      });
    }

    this.requestFilters = filters;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
