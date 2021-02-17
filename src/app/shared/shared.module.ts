import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { EpNgLibModule } from 'ep-ng-lib';
import { NzToolTipModule } from 'ng-zorro-antd';

import { UsedNgZorroAntdModule } from './../ng-zorro-antd.module';
import { CriteriaFormActionsComponent } from './components/auditing/criteria-form-actions/criteria-form-actions.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { LotAutocompleteComponent } from './components/lot-autocomplete/lot-autocomplete.component';
import { LotGroupsRequestsComponent } from './components/lot-groups-requests/lot-groups-requests.component';
import { LotRequestsTableComponent } from './components/lot-requests-table/lot-requests-table.component';
import { MetatypeAutocompleteComponent } from './components/metatype-autocomplete/metatype-autocomplete.component';
import { PersonsEditableListComponent } from './components/persons-editable-list/persons-editable-list.component';
import { RequestsActionsBarComponent } from './components/requests-actions-bar/requests-actions-bar.component';
import { RequestsTableContentComponent } from './components/requests-table-content/requests-table-content.component';
import { RequestsTableComponent } from './components/requests-table/requests-table.component';
import { SignatureTypeInfoComponent } from './components/signature-type-info/signature-type-info.component';
import { TemplateModalComponent } from './components/template-modal/template-modal.component';
import { UserSearchModalComponent } from './components/user-search-modal/user-search-modal.component';
import { UsersAutocompleteComponent } from './components/users-autocomplete/users-autocomplete.component';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { DisableControlDirective } from './directives/disable-control.directive';
import { RequireAdminDirective } from './directives/require-admin.directive';
import { GetCellDataPipe } from './pipes/cell-data.pipe';
import { DateFromDatetimePipe } from './pipes/date-from-datetime.pipe';
import { FilesizePipe } from './pipes/filesize.pipe';

@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    EpNgLibModule,
    UsedNgZorroAntdModule,
    NzToolTipModule,
    RouterModule,
    TranslateModule.forChild()
  ],
  exports: [
    CommonModule,
    DragDropModule,
    UsedNgZorroAntdModule,
    EpNgLibModule,
    RequestsTableComponent,
    RequestsActionsBarComponent,
    UserSearchModalComponent,
    TemplateModalComponent,
    AutocompleteComponent,
    UsersAutocompleteComponent,
    LotAutocompleteComponent,
    LotGroupsRequestsComponent,
    RequestsTableContentComponent,
    LotRequestsTableComponent,
    DateFromDatetimePipe,
    CriteriaFormActionsComponent,
    FilesizePipe,
    PersonsEditableListComponent,
    SignatureTypeInfoComponent,
    RequireAdminDirective,
    AutoFocusDirective,
    MetatypeAutocompleteComponent,
    DisableControlDirective

  ],
  declarations: [
    RequestsTableComponent,
    GetCellDataPipe,
    UserSearchModalComponent,
    TemplateModalComponent,
    RequestsActionsBarComponent,
    AutocompleteComponent,
    UsersAutocompleteComponent,
    LotAutocompleteComponent,
    DateFromDatetimePipe,
    LotGroupsRequestsComponent,
    LotRequestsTableComponent,
    RequestsTableContentComponent,
    CriteriaFormActionsComponent,
    FilesizePipe,
    PersonsEditableListComponent,
    SignatureTypeInfoComponent,
    RequireAdminDirective,
    AutoFocusDirective,
    TemplateModalComponent,
    MetatypeAutocompleteComponent,
    DisableControlDirective
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {ngModule: SharedModule, providers: []};
  }
}
