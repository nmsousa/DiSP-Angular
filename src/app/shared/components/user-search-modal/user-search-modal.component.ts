import { Component, EventEmitter, Injector, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { BaseTableComponent } from 'src/app/shared/components/base-table.component';

import { User } from '../../models/entities/user.model';
import { FilterField } from '../../models/filter-field';
import { AuthenticationService } from '../../services/authentication.service';
import { PersonOption } from './../../models/person-option';

@Component({
  selector: 'app-user-search-modal',
  templateUrl: './user-search-modal.component.html',
  styleUrls: ['./user-search-modal.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class UserSearchModalComponent extends BaseTableComponent implements OnInit, OnDestroy {

  @Input() isVisible: boolean = false;
  @Input() title: string = '';
  @Input() users: Array<{ links: [], content: User }> = [];

  @Output() confirm: EventEmitter<PersonOption[]> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();

  subscriptions: Subscription[] = [];

  searchForm: FormGroup;

  // User selection

  hasAllRecordsChecked: boolean;
  hasSomeRecordsChecked: boolean;
  mapOfCheckedId: { [key: string]: boolean } = {};

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    public authenticationService: AuthenticationService) {

    super(injector);
  }

  ngOnInit() {
    this.createSearchForm();
  }

  onConfirm() {
    // Get the list of the selectedSignatories and send it to the parent component
    this.confirm.emit(this.getSelectedSignatories());

    // Clear everything
    this.clearAllData();
  }

  onCancel() {
    this.close.emit();

    // Clear everything
    this.clearAllData();
  }

  private clearAllData() {
    this.searchForm.reset();
    this.isLoading = false;
    this.hasAllRecordsChecked = false;
    this.hasSomeRecordsChecked = false;
    this.totalRecords = 1;
    this.pageIndex = 1;
    this.users = [];
    this.mapOfCheckedId = {};
  }

  private createSearchForm() {
    this.searchForm = this.fb.group({
      epId: [''],
      username: [''],
      firstname: [''],
      lastname: [''],
      email: ['']
    });
  }

  onClearSearch() {
    this.searchForm.reset();
  }

  onSearch() {
    this.isLoading = true;

    // Every time we do a new search, we clear the previous selection of requests
    this.mapOfCheckedId = {};
    this.refreshSelectionStatus();

    this.subscriptions.push(this.authenticationService
      .getUsers(this.getSearchFilters(), this.pageIndex - 1, this.pageSize)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data: any) => {
          this.totalRecords = data.page.totalElements;
          this.users = data.content;
        }
      )
    );
  }

  checkAll(value: boolean): void {
    this.users.forEach(item => {
      this.mapOfCheckedId[item.content.epId] = value;
    });
    this.refreshSelectionStatus();
  }

  refreshSelectionStatus(): void {
    // Check is all the users are selected
    this.hasAllRecordsChecked = this.users && this.users.length > 0 && this.users
      .every(item => this.mapOfCheckedId[item.content.epId]);

    // Check if some but not all users are selected
    this.hasSomeRecordsChecked =
      this.users.some(item => this.mapOfCheckedId[item.content.epId]) &&
      !this.hasAllRecordsChecked;
  }

  private getSelectedSignatories(): PersonOption[] {
    const signatorySelection: PersonOption[] = [];

    const ids: any[] = Object.keys(this.mapOfCheckedId)
      .filter(key => {
        return this.mapOfCheckedId[key];
      });

    let newPerson: PersonOption;
    this.users.forEach(record => {
      if (ids.includes(record.content.epId.toString())) {
        newPerson = new PersonOption();
        newPerson.username = record.content.username;
        newPerson.label = record.content.fullName;
        newPerson.epId = record.content.epId;
        signatorySelection.push(newPerson);
      }
    });

    return signatorySelection;
  }

  private getSearchFilters(): FilterField[] {
    const filters: FilterField[] = [];

    Object.keys(this.searchForm.controls).forEach(key => {
      if (this.searchForm.controls[key].value) {
        filters.push({text: key, value: this.searchForm.controls[key].value});
      }
    });

    return filters;
  }

}
