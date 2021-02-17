import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { GlobalService, MessageSeverity } from '../../shared/services/global.service';
import { ApiFieldError } from './../../shared/models/rest-api/api-field-error.model';

export const ErrorInterceptorSkipHeader = 'X-Skip-Error-Interceptor';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private globalService: GlobalService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Check if the request has the header: ErrorInterceptorSkipHeader and there was marked to ignore this interceptor
    if (req.headers.has(ErrorInterceptorSkipHeader)) {
      const headers = req.headers.delete(ErrorInterceptorSkipHeader);
      return next.handle(req.clone({headers}));
    }

    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'GENERIC.SERVER.ERROR';
          if (error.error instanceof ErrorEvent || (error.error && error.error.message)) {
            // ErrorEvent is a client side error
            errorMessage = `Error: ${error.error.message}`;
            console.log(errorMessage);
          } else {
            // server side error
            if (error.error) {
              // fieldErrors
              if (error.error.hasOwnProperty('fieldErrors')) {
                error.error.fieldErrors.forEach((fieldError: ApiFieldError) => {
                  this.globalService.showMessage(MessageSeverity.ERROR, fieldError.code);
                  console.log(fieldError);
                });
              }
              // globalErrors
              if (error.error.hasOwnProperty('globalErrors')) {
                error.error.globalErrors.forEach((globalError: ApiFieldError) => {
                  this.globalService.showMessage(MessageSeverity.ERROR, globalError.code);
                  console.log(globalError);
                });
              }

              return throwError('Server side error');

            } else {
              console.log(`Error code: ${error.status}\nMessage: ${error.message}`);
            }
          }

          this.globalService.showMessage(MessageSeverity.ERROR, errorMessage);

          return throwError(errorMessage);
        })
      );
  }

}
