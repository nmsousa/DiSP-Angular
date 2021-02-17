import {EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AutocompleteOption} from '../../models/autocomplete-option';

export abstract class BaseAutocompleteComponent implements OnDestroy {

  @Input() valueField: string = ''; // Normally it would be the «id»
  @Input() clearAfterSelection: boolean = false;
  @Input() control: FormControl = new FormControl();
  @Output() selectionChange: EventEmitter<any> = new EventEmitter();
  @Output() clear: EventEmitter<any> = new EventEmitter();

  subscriptions: Subscription[] = [];
  options: any;
  isLoading: boolean = false;

  protected constructor() { }

  onSelectionChange(event: AutocompleteOption) {
    this.selectionChange.emit(event);
  }

  onClear() {
    this.clear.emit();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
