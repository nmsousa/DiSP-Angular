import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuditingEventsComponent} from './pages/auditing-events/auditing-events.component';

const routes: Routes = [
  {
    path: '',
    component: AuditingEventsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuditingEventsRoutingModule { }
