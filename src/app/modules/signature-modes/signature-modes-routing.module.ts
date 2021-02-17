import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignatureModesComponent} from './pages/signature-modes/signature-modes.component';

const routes: Routes = [
  {
    path: '',
    component: SignatureModesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignatureModesRoutingModule {}
