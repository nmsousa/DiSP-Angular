import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '../../shared/shared.module';
import {LatestRequestsRoutingModule} from './latest-requests-routing.module';
import {LatestRequestsComponent} from './pages/latest-requests/latest-requests.component';

@NgModule({
  declarations: [LatestRequestsComponent],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forChild(),
    SharedModule,
    LatestRequestsRoutingModule
  ]
})
export class LatestRequestsModule { }
