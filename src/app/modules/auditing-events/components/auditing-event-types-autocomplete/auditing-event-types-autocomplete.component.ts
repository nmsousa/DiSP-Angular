import {Component, OnDestroy, OnInit} from '@angular/core';
import {finalize} from 'rxjs/operators';
import {BaseAutocompleteComponent} from '../../../../shared/components/autocomplete/base-autocomplete.component';
import {AuditingEventsService} from '../../services/auditing-events.service';

@Component({
  selector: 'app-auditing-event-types-autocomplete',
  templateUrl: './auditing-event-types-autocomplete.component.html',
  styleUrls: ['./auditing-event-types-autocomplete.component.less']
})
export class AuditingEventTypesAutocompleteComponent extends BaseAutocompleteComponent implements OnInit, OnDestroy {

  constructor(private auditingEventsService: AuditingEventsService) {
    super();
  }

  ngOnInit() {
  }

  onSearchChange(inputText: string) {
    this.isLoading = true;
    this.subscriptions.push(this.auditingEventsService.getAuditingEventTypes([{text: 'key', value: inputText}]).pipe(
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
