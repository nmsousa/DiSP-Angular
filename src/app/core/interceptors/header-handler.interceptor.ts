import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseRemoteService } from '../../shared/services/base-remote.service';
import { RadiusAuthenticationService } from './../../modules/token/services/radius-authentication.service';

@Injectable()
export class HeaderHandlerInterceptor implements HttpInterceptor {

  constructor(
    private baseRemoteService: BaseRemoteService,
    private radiusAuthenticationService: RadiusAuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.baseRemoteService.getApiToken()) {
      req = req.clone({
        headers: req.headers.set('api-authorization', this.baseRemoteService.getApiToken()).set('Content-Type', 'application/json')
      });

      // Update with the date of the last request
      this.radiusAuthenticationService.updateAuthenticationDateTime();

      // If we are authenticated and it's a request that requires tokenActivated
      if (this.radiusAuthenticationService.isAuthenticated()) {
        if (req.withCredentials) {
          req = req.clone({
            headers: req.headers.set('token-activated', this.baseRemoteService.getTokenActivated()).set('Content-Type', 'application/json')
          });
        }
      }
    }

    return next.handle(req);
  }

}
