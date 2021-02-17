import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from './../../shared/guards/can-deactivate.guard';
import { UserPreferencesComponent } from './pages/user-preferences/user-preferences.component';

const routes: Routes = [
  {
    path: '',
    component: UserPreferencesComponent,
    canDeactivate: [CanDeactivateGuard]
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
export class UserPreferencesRoutingModule { }
