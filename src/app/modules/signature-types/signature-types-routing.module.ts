import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignatureTypesComponent } from './pages/signature-types/signature-types.component';

const routes: Routes = [
  {
    path: '',
    component: SignatureTypesComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SignatureTypesRoutingModule { }
