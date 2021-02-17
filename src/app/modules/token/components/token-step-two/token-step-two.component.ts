import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { User } from './../../../../shared/models/entities/user.model';
import { RadiusAuthentificationStatus } from './../../../../shared/models/enums/radius-authentification-status.enum';
import { GlobalService, MessageSeverity } from './../../../../shared/services/global.service';
import { RadiusAuthenticationService } from './../../services/radius-authentication.service';

@Component({
  selector: 'app-token-step-two',
  templateUrl: './token-step-two.component.html',
  styleUrls: ['./token-step-two.component.less']
})
export class TokenStepTwoComponent implements OnInit {

  @Input()
  user: Observable<{ links: any[]; content: User }>;
  @Input()
  radiusState: string;

  @Output()
  stepComplete: EventEmitter<RadiusAuthentificationStatus> = new EventEmitter();

  token: string = '';

  subscriptions: Subscription[] = [];
  focusInput: boolean = false;

  constructor(
    private location: Location,
    private globalService: GlobalService,
    private radiusAuthenticationService: RadiusAuthenticationService
  ) { }

  ngOnInit() {
    this.focusInput = true;
  }

  onSignIn(): void {
    this.subscriptions.push(
      this.radiusAuthenticationService.authenticateRadiusStep2(this.token, this.radiusState).subscribe(result => {
        if (result && result.content) {
          if (result === RadiusAuthenticationService.STEP_DATETIME_EXPIRED) {
            this.stepComplete.emit(result);
            // If we got another challenge, we must ask the user to enter a new one
          } else if (result.content.radiusAuthentificationStatus === RadiusAuthentificationStatus.ACCESS_CHALLENGE) {
            this.token = '';
            this.globalService.showMessage(MessageSeverity.WARN, 'TOKEN.ANOTHER_CHALLENGE_REQUESTED.WARNING.MESSAGE');
          } else {
            this.stepComplete.emit(result.content.radiusAuthentificationStatus);
          }
        }
      })
    );
  }

  onBack(): void {
    this.location.back();
  }

}
