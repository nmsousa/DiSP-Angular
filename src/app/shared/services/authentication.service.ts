import { HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ErrorInterceptorSkipHeader } from '../../core/interceptors/error-handler.interceptor';
import { User } from '../models/entities/user.model';
import { FilterField } from '../models/filter-field';
import { BACKEND_PAGINATION_DEFAULT, BaseRemoteService } from './base-remote.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseRemoteService {

  public static ROLE_ADMIN: string = 'admin';

  currentUser: User;
  role$: Subject<string> = new Subject<string>();

  public getUsername(): string {
    return this.currentUser ? this.currentUser.username : '';
  }

  public getFullname(): string {
    return this.currentUser ? this.currentUser.fullName : '';
  }

  public getUserId(): number {
    return this.currentUser ? this.currentUser.id : 0;
  }

  public isAdmin(): boolean {
    return this.role() === AuthenticationService.ROLE_ADMIN;
  }

  public role(): string {
    return (this.currentUser &&  this.currentUser.role) ? this.currentUser.role.toLowerCase() : '';
  }

  constructor(injector: Injector) {
    super(injector);
  }

  getAuthenticatedUser(): Observable<any> {
    // Skip any possible error messages
    const skipErrorHeaders = new HttpHeaders().set(ErrorInterceptorSkipHeader, '');

    return this.http.get<{ links: any[], content: User }>(`${this.apiUrl}admin/users/session`, {headers: skipErrorHeaders}).pipe(
      tap((result: any) => {
          this.currentUser = result.content;
          this.role$.next(this.role());
        }
      )
    );
  }

  getUsers(
    filters: FilterField[] = null,
    pageIndex: number = 0,
    pageSize: number = BACKEND_PAGINATION_DEFAULT): Observable<any> {

    let httpParams = this.getDefaultsHttpParams(pageIndex, pageSize)
      .append('isActive', '1');

    // Filters
    httpParams = this.addFiltersToHttpParams(filters, httpParams);

    // Skip any possible error messages
    const skipErrorHeaders = new HttpHeaders().set(ErrorInterceptorSkipHeader, '');

    return this.http.get<any>(`${this.apiUrl}admin/users`, {params: httpParams, headers: skipErrorHeaders});
  }

}
