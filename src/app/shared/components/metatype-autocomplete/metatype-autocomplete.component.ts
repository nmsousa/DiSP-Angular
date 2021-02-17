import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { BaseAutocompleteComponent } from '../autocomplete/base-autocomplete.component';
import { MetatypeService } from './../../services/metatype.service';

@Component({
  selector: 'app-metatype-autocomplete',
  templateUrl: './metatype-autocomplete.component.html',
  styleUrls: ['./metatype-autocomplete.component.less']
})
export class MetatypeAutocompleteComponent extends BaseAutocompleteComponent implements OnInit, OnDestroy {

  @Input() inputValue: string = '';

  constructor(private metatypeService: MetatypeService) {
    super();
  }

  ngOnInit() {
  }

  onSearchChange(inputText: string) {
    this.isLoading = true;
    this.subscriptions.push(this.metatypeService.getMetatypes([{text: 'name', value: inputText}]).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    )
      .subscribe(result => {
        this.options = result.content;
      }));
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
