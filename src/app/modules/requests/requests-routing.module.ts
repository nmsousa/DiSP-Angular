import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from './../../shared/guards/can-deactivate.guard';
import { EditRequestComponent } from './pages/edit-request/edit-request.component';
import { NewRequestComponent } from './pages/new-request/new-request.component';
import { RequestLocateSignatureComponent } from './pages/request-locate-signature/request-locate-signature.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { ViewRequestComponent } from './pages/view-request/view-request.component';

const routes: Routes = [
  {
    path: '',
    component: RequestsComponent
  },
  {
    path: 'new',
    component: NewRequestComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: ':id/edit',
    component: EditRequestComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: ':id',
    component: ViewRequestComponent
  },
  {
    path: ':id/locate',
    component: RequestLocateSignatureComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule {}
