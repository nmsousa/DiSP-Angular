import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from './../../shared/guards/can-deactivate.guard';
import { EditTemplateComponent } from './pages/edit-template/edit-template.component';
import { NewTemplateComponent } from './pages/new-template/new-template.component';
import { TemplatesComponent } from './pages/templates/templates.component';
import { ViewTemplateComponent } from './pages/view-template/view-template.component';

const routes: Routes = [
  {
    path: '',
    component: TemplatesComponent
  },
  {
    path: 'new',
    component: NewTemplateComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: ':id/edit',
    component: EditTemplateComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: ':id',
    component: ViewTemplateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesRoutingModule {}
