import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { AutocompleteOption } from '../../models/autocomplete-option';
import { FilterField } from '../../models/filter-field';
import { GetCellDataPipe } from '../../pipes/cell-data.pipe';

const CUSTOM_VALUE_ACCESSOR: any = {
  provide : NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AutocompleteComponent),
  multi : true,
};

@Component({
  selector: 'app-autocomplete',
  providers : [CUSTOM_VALUE_ACCESSOR],
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.less']
})
export class AutocompleteComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() placeHolder: string = '';
  @Input() isLoading: boolean = false;
  @Input() options: Array<{ links: any[], content: any }> = [];
  @Input() valueField: string = 'epId';
  @Input() labelField: string = '';
  @Input() labelId: string = '';
  @Input() idTranslation: string = 'id';
  @Input() inputValue: string = '';
  @Input() clearAfterSelection: boolean = false;
  @Input() formControl: FormControl;

  @Output() searchChange: EventEmitter<string> = new EventEmitter();
  @Output() selectionChange: EventEmitter<AutocompleteOption> = new EventEmitter();
  @Output() clear: EventEmitter<any> = new EventEmitter();

  subscriptions: Subscription[] = [];
  searchedRecords: FilterField[] = [];
  debounceSearchUpdate$ = new Subject<string>();
  getCellDataPipe: GetCellDataPipe = new GetCellDataPipe();

  private onChange = (_) => { };
  private onTouched = () => { };

  constructor() { }

  ngOnInit() {
    this.subscribeDebounceInput();
  }

  writeValue(value: any) {
    if (value && this.formControl) {
      this.formControl.setValue(value, { emitEvent: false, emitModelToViewChange: false });
    }
    // Form reset for example
    if (!value) {
      this.clearInputValue();
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  subscribeDebounceInput(): void {
    this.subscriptions.push(this.debounceSearchUpdate$.pipe(
      debounceTime(500))
      .subscribe(() => {
        this.filterByInput();
      }));
  }

  filterByInput(): void {
    this.onChange(null); // We want to keep formControl with the value of the selected item in the dropdown only
    // Only start searching after 3 chars
    if (this.inputValue.length >= 3) {
      this.searchChange.emit(this.inputValue);
    } else if (!this.inputValue.length) { // If we cleared the search
      if (this.searchedRecords.length > 0) { // And we were already filtering by an option
        // Clear the previous lists
        this.searchedRecords = [];
        this.options = [];
      }
    }

  }

  clearInputValue(): void {
    this.onChange(null); // We want to keep formControl with the value of the selected item in the dropdown only
    this.inputValue = '';
    this.searchedRecords = []; // Clear the previous
    this.options = []; // Clear the previous list
    this.clear.emit();
  }

  changedSelection(id: any, label: string) {
    this.onChange({id, label}); // We want to keep formControl with the value of the selected item in the dropdown only
    this.selectionChange.emit({id, label});
    if (this.clearAfterSelection) {
      // Fix because without a timeout, the input is not cleared.
      // It seem's that we are trying to clear it before the selection even finishes
      setTimeout(() => this.clearInputValue(), 0);
    }
  }

  getOptionLabel(record: any): string {
    return this.labelId ?
      `${this.getCellDataPipe.transform(record, this.labelField)} (${this.idTranslation}: ${record[this.labelId]})` :
      this.getCellDataPipe.transform(record, this.labelField);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
