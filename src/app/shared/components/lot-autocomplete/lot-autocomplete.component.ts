import {Component, OnDestroy, OnInit} from '@angular/core';
import {finalize} from 'rxjs/operators';
import {LotService} from '../../services/lot.service';
import {BaseAutocompleteComponent} from '../autocomplete/base-autocomplete.component';

@Component({
  selector: 'app-lot-autocomplete',
  templateUrl: './lot-autocomplete.component.html',
  styleUrls: ['./lot-autocomplete.component.less']
})
export class LotAutocompleteComponent extends BaseAutocompleteComponent implements OnInit, OnDestroy {

  constructor(private lotService: LotService) {
    super();
  }

  ngOnInit() {
  }

  onSearchChange(inputText: string) {
    this.isLoading = true;
    this.subscriptions.push(this.lotService.getLots([{text: 'lotName', value: inputText}]).pipe(
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
