import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../../shared/shared.module';
import { SearchRequestsComponent } from './pages/search-requests/search-requests.component';
import { SearchRequestsRoutingModule } from './search-requests-routing.module';

@NgModule({
  declarations: [SearchRequestsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild(),
    SharedModule,
    SearchRequestsRoutingModule
  ]
})
export class SearchRequestsModule { }
