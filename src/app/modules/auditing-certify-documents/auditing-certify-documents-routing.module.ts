import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuditingCertifyDocumentsComponent } from './pages/auditing-certify-documents/auditing-certify-documents.component';

const routes: Routes = [
  {
    path: '',
    component: AuditingCertifyDocumentsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuditingCertifyDocumentsRoutingModule { }
