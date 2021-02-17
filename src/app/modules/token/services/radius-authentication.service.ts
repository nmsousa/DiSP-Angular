import { Injectable, Injector } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GlobalService, MessageSeverity } from 'src/app/shared/services/global.service';

import { NewRadiusAuthenticationInput } from '../../../shared/models/input/new-radius-authentication-input.model';
import { BaseRemoteService } from '../../../shared/services/base-remote.service';
import { RadiusAuthentificationStatus } from './../../../shared/models/enums/radius-authentification-status.enum';
import { AuthenticationService } from './../../../shared/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RadiusAuthenticationService extends BaseRemoteService {

  public static STEP_DATETIME_EXPIRED: string = 'stepDateTimeExpired';
  public static STEP_ONE_AUTHENTICATION_TIME: string = 'stepOneAuthenticationTime';
  public static STEP_TWO_AUTHENTICATION_TIME: string = 'stepTwoAuthenticationTime';
  public static STEP_ONE_DURATION: number = 600; // 10 mins
  public static STEP_TWO_DURATION: number = 840; // 14 mins

  authentication$: Subject<string> = new Subject<string>();

  constructor(
    injector: Injector,
    private authenticationService: AuthenticationService,
    private globalService: GlobalService) {
    super(injector);
  }

  /**
   * 1st Step: username, pin, isChallenge = false
   */
  authenticateRadiusStep1(pin: string): Observable<any> {
    const newRadiusAuthenticationInput: NewRadiusAuthenticationInput = new NewRadiusAuthenticationInput();
    newRadiusAuthenticationInput.username = this.authenticationService.getUsername();
    newRadiusAuthenticationInput.pin = pin;
    newRadiusAuthenticationInput.isChallenge = false;

    return this.http.post<any>(`${this.apiUrl}admin/radius/authenticate`, newRadiusAuthenticationInput).pipe(
      tap((result: any) => {

        // 1st Step OK -> Going for 2nd Step
        if (result.content.radiusAuthentificationStatus === RadiusAuthentificationStatus.ACCESS_CHALLENGE) {
          sessionStorage.setItem(RadiusAuthenticationService.STEP_ONE_AUTHENTICATION_TIME, new Date().getTime().toString());
        } else {
          // If we get here, it means that the user got successfully authenticated on the first step (using PIN+TOKEN),
          // no need to go to the 2nd step
          this.checkOtherSteps(result.content.radiusAuthentificationStatus);
        }
      })
    );
  }

  /**
   * 2nd Step: username, token (ex: 01234), isChallenge = true, "radiusState": "challenge state... (binary)"
   */
  authenticateRadiusStep2(token: string, radiusState: string): Observable<any> {
    // If the step 1 token is still valid
    if (this.isAuthenticated(
      RadiusAuthenticationService.STEP_ONE_AUTHENTICATION_TIME,
      RadiusAuthenticationService.STEP_ONE_DURATION)) {
      const newRadiusAuthenticationInput: NewRadiusAuthenticationInput = new NewRadiusAuthenticationInput();

      newRadiusAuthenticationInput.username = this.authenticationService.getUsername();
      newRadiusAuthenticationInput.token = token;
      newRadiusAuthenticationInput.isChallenge = true;
      newRadiusAuthenticationInput.radiusState = radiusState ? radiusState : 'challenge state... (binary)';

      return this.authenticateRadius(newRadiusAuthenticationInput).pipe(
        tap((result: any) => {
          // If ACCESS_ACCEPT, then the user got successfully authenticated
          this.checkOtherSteps(result.content.radiusAuthentificationStatus);
        }
        ));
    } else {
      // Step one expired
      this.globalService.showMessage(MessageSeverity.ERROR, 'TOKEN.STEP_ONE_EXPIRED.ERROR.MESSAGE');
      return of(RadiusAuthenticationService.STEP_DATETIME_EXPIRED);
    }
  }

  private authenticateRadius(newRadiusAuthenticationInput: NewRadiusAuthenticationInput): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}admin/radius/authenticate`, newRadiusAuthenticationInput);
  }

  private checkOtherSteps(result: RadiusAuthentificationStatus): void {
    if (result === RadiusAuthentificationStatus.ACCESS_ACCEPT) {
      sessionStorage.setItem(RadiusAuthenticationService.STEP_TWO_AUTHENTICATION_TIME, new Date().getTime().toString());
    } else if (result === RadiusAuthentificationStatus.ACCESS_REJECT) {
      // Your code is incorrect OR your token is blocked. Please try again or contact the support.
      this.globalService.showMessage(MessageSeverity.ERROR, 'TOKEN.AUTHENTICATE.ERROR.MESSAGE');
    }
    this.authentication$.next(result);
  }

  /**
   * This method is able to see if either step1 or step2 are valid
   */
  public isAuthenticated(
    step: string = RadiusAuthenticationService.STEP_TWO_AUTHENTICATION_TIME,
    duration: number = RadiusAuthenticationService.STEP_TWO_DURATION): boolean {

    const dateTimeAuthentication: string = sessionStorage.getItem(step);

    // If we have any info that an authentication occurred,
    // we check if it's still valid (less than 14 minutes since the last server request)
    if (dateTimeAuthentication) {
      const lastAuthenticationDateTime: number = Number(dateTimeAuthentication);
      const currentDateTime: number = new Date().getTime();

      // If the last authentication is older than 14 minutes
      if (((currentDateTime - lastAuthenticationDateTime) / 1000) <= duration) {
        return true;
      }
    }

    return false;
  }

  public updateAuthenticationDateTime(): void {
    if (this.isAuthenticated()) {
      sessionStorage.setItem(RadiusAuthenticationService.STEP_TWO_AUTHENTICATION_TIME, new Date().getTime().toString());
    } else {
      this.authentication$.next(RadiusAuthenticationService.STEP_DATETIME_EXPIRED);
    }
  }

}
