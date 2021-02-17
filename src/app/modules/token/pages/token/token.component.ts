import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { User } from './../../../../shared/models/entities/user.model';
import { RadiusAuthentificationStatus } from './../../../../shared/models/enums/radius-authentification-status.enum';
import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { GlobalService, MessageSeverity } from './../../../../shared/services/global.service';
import { RadiusAuthenticationService } from './../../services/radius-authentication.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class TokenComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  user$: Observable<{ links: any[]; content: User }>;
  radiusState: string;
  isHelpModalVisible: boolean = false;
  stepStatus: number = 1; // 1 - First step, 2 - Second step, 3 - Authenticated

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private radiusAuthenticationService: RadiusAuthenticationService,
    private globalService: GlobalService) { }

  ngOnInit() {
    this.checkStep1Authentication();

    this.user$ = this.authenticationService.getAuthenticatedUser();
  }

  checkStep1Authentication(): void {
    // If we already passed the step 1, we go directly to the step 2
    if (this.radiusAuthenticationService.isAuthenticated(
      RadiusAuthenticationService.STEP_ONE_AUTHENTICATION_TIME,
      RadiusAuthenticationService.STEP_ONE_DURATION)) {
        this.stepStatus = 2;
    }
  }

  onStepOneComplete(result: { radiusAuthentificationStatus: RadiusAuthentificationStatus, radiusState: string }): void {
    // First step OK
    if (result.radiusAuthentificationStatus === RadiusAuthentificationStatus.ACCESS_CHALLENGE) {
      this.radiusState = result.radiusState;
      this.stepStatus = 2;
      // Second step OK
    } else if (result.radiusAuthentificationStatus === RadiusAuthentificationStatus.ACCESS_ACCEPT) {
      this.authenticationOk();
    }
  }

  onStepTwoComplete(radiusAuthentificationStatus: any): void {
    if (radiusAuthentificationStatus === RadiusAuthentificationStatus.ACCESS_ACCEPT) {
      this.authenticationOk();
      // Step 1 expired, we go back to step 1
    } else if (radiusAuthentificationStatus === RadiusAuthenticationService.STEP_DATETIME_EXPIRED) {
      this.stepStatus = 1;
    }
  }

  authenticationOk(): void {
    this.stepStatus = 3;
    this.router.navigateByUrl('/certify-document');
    this.globalService.showMessage(MessageSeverity.SUCCESS, 'TOKEN.AUTHENTICATED.SUCCESS.MESSAGE');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
