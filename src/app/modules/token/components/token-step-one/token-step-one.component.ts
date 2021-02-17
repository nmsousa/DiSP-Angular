import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RadiusAuthentificationStatus } from 'src/app/shared/models/enums/radius-authentification-status.enum';

import { User } from './../../../../shared/models/entities/user.model';
import { RadiusAuthenticationService } from './../../services/radius-authentication.service';

@Component({
  selector: 'app-token-step-one',
  templateUrl: './token-step-one.component.html',
  styleUrls: ['./token-step-one.component.less']
})
export class TokenStepOneComponent implements OnInit {

  @Input()
  user: Observable<{ links: any[]; content: User }>;

  @Output()
  stepComplete: EventEmitter<{ radiusAuthentificationStatus: RadiusAuthentificationStatus, radiusState: string }>
    = new EventEmitter(); // Can go to the 2nd or authenticate directly

  subscriptions: Subscription[] = [];

  constructor(
    private radiusAuthenticationService: RadiusAuthenticationService,
    private location: Location) { }

  ngOnInit() { }

  onProceed(pin: string): void {
    this.subscriptions.push(
      this.radiusAuthenticationService.authenticateRadiusStep1(pin).subscribe(result => {
        if (result && result.content) {
          this.stepComplete.emit({
            radiusAuthentificationStatus: result.content.radiusAuthentificationStatus,
            radiusState: result.content.radiusState
          });
        }
      })
    );
  }

  onBack(): void {
    this.location.back();
  }

}
