import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from './../../shared/shared.module';
import {
  MyPreferencesNotificationTypeRowComponent,
} from './components/my-preferences-notification-type-row/my-preferences-notification-type-row.component';
import { UserPreferencesComponent } from './pages/user-preferences/user-preferences.component';
import { UserPreferencesRoutingModule } from './user-preferences-routing.module';

@NgModule({
  declarations: [UserPreferencesComponent, MyPreferencesNotificationTypeRowComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserPreferencesRoutingModule,
    SharedModule,
    TranslateModule.forChild()
  ]
})
export class UserPreferencesModule { }
