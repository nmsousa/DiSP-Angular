import { Component, Injector, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseAuditingComponent } from 'src/app/shared/components/auditing/base-auditing.component';

import { DateUtils } from '../../../../shared/utils/date.utils';
import { AuditingEventsService } from '../../services/auditing-events.service';
import { CustomDateRangeValidator } from './../../../../shared/components/auditing/base-auditing.component';

@Component({
  selector: 'app-auditing-events',
  templateUrl: './auditing-events.component.html',
  styleUrls: ['./auditing-events.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AuditingEventsComponent extends BaseAuditingComponent implements OnInit, OnDestroy {

  constructor(injector: Injector, private fb: FormBuilder, private auditingEventsService: AuditingEventsService) {
    super(injector, auditingEventsService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  // Overriding super class method
  createSearchForm() {
    this.searchForm = this.fb.group({
      'occurredDate_From': [DateUtils.addDays(new Date(), -7), [Validators.required]],
      'occurredDate_To': [new Date(), [Validators.required]],
      'requestId': [null],
      'requestTitle': [null],
      'type.id': [null],
      'username': [null]
    }, { validator: CustomDateRangeValidator });
  }

  getFilters(): any {
    return this.searchForm.value;
  }

  onExport(): void {
    super.onExport(this.searchForm.value);
  }

  getEventTypeLabel(key: string) {
    let label = key;
    const keyParts: string[] = key ? key.split('.') : [];

    if (keyParts && keyParts.length > 1) {
      label = keyParts.slice(1).join(' ');
    }

    return label;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
