import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EpNgLibModule } from 'ep-ng-lib';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { TokenModule } from '../token/token.module';
import { SharedModule } from './../../shared/shared.module';
import {
  EditRequestGenericContentComponent,
} from './components/edit-request-generic-content/edit-request-generic-content.component';
import { EditRequestComponent } from './pages/edit-request/edit-request.component';
import { NewRequestComponent } from './pages/new-request/new-request.component';
import { RequestLocateSignatureComponent } from './pages/request-locate-signature/request-locate-signature.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { ViewRequestComponent } from './pages/view-request/view-request.component';
import { RequestsRoutingModule } from './requests-routing.module';

@NgModule({
  declarations: [
    ViewRequestComponent,
    NewRequestComponent,
    EditRequestComponent,
    EditRequestGenericContentComponent,
    RequestsComponent,
    RequestLocateSignatureComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    EpNgLibModule,
    PdfViewerModule,
    PerfectScrollbarModule,
    TranslateModule.forChild(),
    SharedModule,
    RequestsRoutingModule,
    TokenModule
  ]
})
export class RequestsModule {}
