import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from './../../shared/shared.module';
import { AuditingCertifyDocumentsRoutingModule } from './auditing-certify-documents-routing.module';
import { AuditingCertifyDocumentsComponent } from './pages/auditing-certify-documents/auditing-certify-documents.component';

@NgModule({
  declarations: [AuditingCertifyDocumentsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    SharedModule,
    AuditingCertifyDocumentsRoutingModule
  ]
})
export class AuditingCertifyDocumentsModule { }
