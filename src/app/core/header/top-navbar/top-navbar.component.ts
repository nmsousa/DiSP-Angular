import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';

import { User } from '../../../shared/models/entities/user.model';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { RadiusAuthenticationService } from './../../../modules/token/services/radius-authentication.service';
import { RadiusAuthentificationStatus } from './../../../shared/models/enums/radius-authentification-status.enum';
import { GlobalService, MessageSeverity } from './../../../shared/services/global.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.less']
})
export class TopNavbarComponent implements OnInit, OnDestroy {

  @Input() isCollapsed: boolean;
  @Input() menu: object;
  @Output() clickTrigger = new EventEmitter<boolean>();

  subscriptions: Subscription[] = [];
  language: string = 'en';
  form: FormGroup;
  search = new FormControl('');
  authenticationStatus: string = 'off'; // 'on / 'off'

  user$: Observable<{ links: any[]; content: User }>;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private globalService: GlobalService,
    private authenticationService: AuthenticationService,
    private radiusAuthenticationService: RadiusAuthenticationService) {
  }

  ngOnInit() {
    // Check if the user was already authenticated on the radius services
    this.checkIfPreviouslyAuthenticated();

    this.user$ = this.authenticationService.getAuthenticatedUser();
    this.subscriptions.push(this.radiusAuthenticationService.authentication$.subscribe(result => {
      this.authenticationStatus =
        (result === RadiusAuthentificationStatus.ACCESS_ACCEPT) ? 'on' : 'off';
    }));
  }

  checkIfPreviouslyAuthenticated(): void {
    this.authenticationStatus = this.radiusAuthenticationService.isAuthenticated() ? 'on' : 'off';
  }

  navigateToTokenPage(): void {
    if (this.authenticationStatus === 'off') {
      this.router.navigateByUrl('/token');
    } else {
      this.globalService.showMessage(MessageSeverity.INFO, 'TOKEN.AUTHENTICATED.INFO.MESSAGE');
    }
  }

  onClickCollapse() {
    this.clickTrigger.emit(!this.isCollapsed);
  }

  onLanguageChange() {
    this.translate.use(this.language);
  }

  onSwitchOldUI() {
    window.location.href = window.location.origin + '/disp/home.html';
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
