import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from './../../shared/shared.module';
import { CertifyDocumentRoutingModule } from './certify-document-routing.module';
import { CertifyDocumentComponent } from './pages/certify-document/certify-document.component';

@NgModule({
  declarations: [CertifyDocumentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CertifyDocumentRoutingModule,
    TranslateModule.forChild(),
    SharedModule,
    CertifyDocumentRoutingModule
  ]
})
export class CertifyDocumentModule { }
