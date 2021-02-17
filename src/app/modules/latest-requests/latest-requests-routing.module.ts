import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LatestRequestsComponent} from './pages/latest-requests/latest-requests.component';

const routes: Routes = [
  {
    path: '',
    component: LatestRequestsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LatestRequestsRoutingModule { }
