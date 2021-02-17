import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../../shared/shared.module';
import { SignatureTypesComponent } from './pages/signature-types/signature-types.component';
import { SignatureTypesRoutingModule } from './signature-types-routing.module';

@NgModule({
  declarations: [SignatureTypesComponent],
  imports: [
    FormsModule,
    SignatureTypesRoutingModule,
    SharedModule,
    TranslateModule.forChild()
  ]
})
export class SignatureTypesModule { }
