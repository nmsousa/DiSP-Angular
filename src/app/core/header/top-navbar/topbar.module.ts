import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../../../shared/shared.module';
import { TopNavbarComponent } from './top-navbar.component';

@NgModule({
  declarations: [TopNavbarComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    TranslateModule.forChild()
  ],
  exports: [TopNavbarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TopbarModule {}
