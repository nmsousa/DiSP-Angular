import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EpNgLibModule } from 'ep-ng-lib';

import { SharedModule } from './../../shared/shared.module';
import { TemplateThirdPartyComponent } from './components/template-third-party/template-third-party.component';
import { EditTemplateComponent } from './pages/edit-template/edit-template.component';
import { NewTemplateComponent } from './pages/new-template/new-template.component';
import { TemplatesComponent } from './pages/templates/templates.component';
import { ViewTemplateComponent } from './pages/view-template/view-template.component';
import { TemplatesRoutingModule } from './templates-routing.module';

@NgModule({
  declarations: [
    TemplatesComponent,
    EditTemplateComponent,
    ViewTemplateComponent,
    NewTemplateComponent,
    TemplateThirdPartyComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    EpNgLibModule,
    TemplatesRoutingModule,
    TranslateModule.forChild()
  ]
})
export class TemplatesModule {}
