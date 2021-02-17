import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../../shared/shared.module';
import { SignatureModesComponent } from './pages/signature-modes/signature-modes.component';
import { SignatureModesRoutingModule } from './signature-modes-routing.module';

@NgModule({
  declarations: [SignatureModesComponent],
  imports: [
    SignatureModesRoutingModule,
    SharedModule,
    TranslateModule.forChild()
  ]
})
export class SignatureModesModule { }
