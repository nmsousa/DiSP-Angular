import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { UserPreferences } from './../../../shared/models/entities/user-preferences.model';
import { AuthenticationService } from './../../../shared/services/authentication.service';
import { BaseRemoteService } from './../../../shared/services/base-remote.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseRemoteService {

  constructor(injector: Injector, private authenticationService: AuthenticationService) {
    super(injector);
  }

  // Find one userPreference using GET
  getUserPreferences(): Observable<any> {
    const userId: number = this.authenticationService.getUserId();

    return this.http.get<any>(this.apiUrl + `admin/users/${userId}/userPreferences`);
  }

  // Save userPreference using PUT
  saveUserPreferences(userPreferences: UserPreferences): Observable<any> {
    const userId: number = this.authenticationService.getUserId();

    return this.http.put<any>(this.apiUrl + `/admin/users/${userId}/userPreferences`, userPreferences);
  }

}
