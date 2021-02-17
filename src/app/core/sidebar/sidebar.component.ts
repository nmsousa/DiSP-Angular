import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { RadiusAuthenticationService } from './../../modules/token/services/radius-authentication.service';
import { GlobalService, MessageSeverity } from './../../shared/services/global.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent {
  @Input() isCollapsed: boolean;
  @Input() menu: object[];
  sidebarMenu: object[];

  constructor(
    private router: Router,
    private globalService: GlobalService,
    private radiusAuthenticationService: RadiusAuthenticationService) { }

  navigateToTokenPage(): void {
    if (!this.radiusAuthenticationService.isAuthenticated()) {
      this.router.navigateByUrl('/token');
    } else {
      this.globalService.showMessage(MessageSeverity.INFO, 'TOKEN.AUTHENTICATED.INFO.MESSAGE');
    }
  }

  openPopup(url: string): void {
    window.open(
      url,
      'popUpWindow',
      'height=700,width=800,left=100,top=50,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes');
  }



}
