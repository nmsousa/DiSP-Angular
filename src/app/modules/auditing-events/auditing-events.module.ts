import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../../shared/shared.module';
import { AuditingEventsRoutingModule } from './auditing-events-routing.module';
import {
  AuditingEventTypesAutocompleteComponent,
} from './components/auditing-event-types-autocomplete/auditing-event-types-autocomplete.component';
import { AuditingEventsComponent } from './pages/auditing-events/auditing-events.component';

@NgModule({
  declarations: [AuditingEventsComponent, AuditingEventTypesAutocompleteComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    SharedModule,
    AuditingEventsRoutingModule
  ]
})
export class AuditingEventsModule { }
