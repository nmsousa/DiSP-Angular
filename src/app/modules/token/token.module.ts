import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from './../../shared/shared.module';
import { TokenHelpModalComponent } from './components/token-help-modal/token-help-modal.component';
import { TokenStepOneComponent } from './components/token-step-one/token-step-one.component';
import { TokenStepTwoComponent } from './components/token-step-two/token-step-two.component';
import { TokenComponent } from './pages/token/token.component';
import { TokenRoutingModule } from './token-routing.module';

@NgModule({
  declarations: [TokenComponent, TokenHelpModalComponent, TokenStepOneComponent, TokenStepTwoComponent],
  imports: [
    TokenRoutingModule,
    CommonModule,
    FormsModule,
    SharedModule,
    TranslateModule.forChild()
  ]
})
export class TokenModule { }
