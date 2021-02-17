import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { TemplateThirdParty } from './../../../../shared/models/entities/template-third-party.model';
import { GlobalService, MessageSeverity } from './../../../../shared/services/global.service';

// The Constant EMAIL_ALLOWED_DOMAIN
const EMAIL_ALLOWED_DOMAIN: string = 'europa.eu';

@Component({
  selector: 'app-template-third-party',
  templateUrl: './template-third-party.component.html',
  styleUrls: ['./template-third-party.component.less']
})
export class TemplateThirdPartyComponent implements OnInit {

  @Input() records: TemplateThirdParty[] = [];

  @Output() recordsChanged: EventEmitter<TemplateThirdParty[]> = new EventEmitter();

  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
  inputValue: string = '';

  constructor(private globalService: GlobalService) { }

  ngOnInit() {
  }

  removeRecord(record: any) {
    this.records = this.records.filter(item => item.email !== record.email);

    this.recordsHasChanged();
  }

  clearAllRecords() {
    this.records = [];
    this.recordsHasChanged();
  }

  recordsHasChanged(): void {
    this.recordsChanged.emit(this.records);
  }

  clearInputValue(): void {
    this.inputValue = '';
  }

  addToRecords(isEmailInvalid: boolean = false) {
    if (isEmailInvalid) {
      this.globalService.showMessage(MessageSeverity.ERROR, 'TEMPLATE_THIRD_PARTY.ERROR.INVALID_EMAIL');
    } else if (!this.inputValue.endsWith(EMAIL_ALLOWED_DOMAIN)) {
      this.globalService.showMessage(MessageSeverity.ERROR, 'TEMPLATE_THIRD_PARTY.ERROR.EMAIL_DOMAIN_ALLOWED');
    } else if (!this.records.some(item => item.email === this.inputValue)) {
      // For some reason the this.records.push() doesn't work.
      // The nz-list component doesn't detect the changes if the instance already exists
      const newThirdPartyItem: TemplateThirdParty = {id: 0, email: this.inputValue, template: null};
      this.records = [...this.records, newThirdPartyItem];

      this.clearInputValue();
      this.recordsHasChanged();
    }
  }

}
