import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CertifyDocumentComponent } from './pages/certify-document/certify-document.component';

const routes: Routes = [{ path: '', component: CertifyDocumentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertifyDocumentRoutingModule { }
