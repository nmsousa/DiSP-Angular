import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchRequestsComponent} from './pages/search-requests/search-requests.component';

const routes: Routes = [
  {
    path: '',
    component: SearchRequestsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SearchRequestsRoutingModule { }
