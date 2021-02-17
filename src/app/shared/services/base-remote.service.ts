import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {environment} from '../../../environments/environment';
import {FilterField} from '../models/filter-field';

export const BACKEND_PAGINATION_MINIMUM = 5;
export const BACKEND_PAGINATION_DEFAULT = 10;
export const BACKEND_PAGINATION_LIMIT = 25;

@Injectable({
  providedIn: 'root'
})
export class BaseRemoteService {

  protected http: HttpClient;
  protected externalApplication = 'DISP-Client';
  protected apiAuthorization: string = '';
  public apiUrl: string = '';

  constructor(injectorObj: Injector) {
    this.http = injectorObj.get(HttpClient);

    this.getEnvironmentFromURL();
  }

  /**
   * This is to avoid having to change POM in order to create 1 separate build for each environment
   */
  private getEnvironmentFromURL(): string {
    let envName: string = 'localhost';
    const url: string = window.location.origin;

    const envNamePrefix: string = '://disp';
    const envNameStartIndex: number = url.indexOf(envNamePrefix);
    const envNameEndIndex: number = url.indexOf('.in.ep.europa.eu');
    if (envNameStartIndex > -1 && envNameEndIndex > -1) {
      envName = url.substring(envNameStartIndex + envNamePrefix.length, envNameEndIndex);
    }

    switch (envName.toLowerCase()) {
      case 'dv': {
        this.apiUrl = 'https://dispdv.in.ep.europa.eu/disp/api/v1/';
        this.apiAuthorization = 'bearer eyJhbGciOiJIUzI1NiJ9.' +
          'eyJleHRBcHBOYW1lIjoiRElTUC1DbGllbnQiLCJleHRBcHBJZCI6ODcyLCJpc3MiOiJESVNQLURWIiwiaWF0IjoxNTMwNTQ2OTY5fQ.' +
          'jdDO52i8bccq5rM1V91axRXlMmmz7vPMyFppgmvDEiU';
        break;
      }
      case 'it': {
        this.apiUrl = 'https://dispit.in.ep.europa.eu/disp/api/v1/';
        this.apiAuthorization = 'bearer eyJhbGciOiJIUzI1NiJ9.' +
          'eyJleHRBcHBOYW1lIjoiRElTUC1DbGllbnQiLCJleHRBcHBJZCI6MjEsImlzcyI6IkRJU1AtSVQiLCJpYXQiOjE1MzM3NDAyNDd9.' +
          '6pzXfUNaLJVgK2777ru0B4E3FGs_btG2OZxVxd8lfK8';
        break;
      }
      case 'pp': {
        this.apiUrl = 'https://disppp.in.ep.europa.eu/disp/api/v1/';
        this.apiAuthorization = 'bearer eyJhbGciOiJIUzI1NiJ9.' +
          'eyJleHRBcHBOYW1lIjoiRElTUC1DbGllbnQiLCJleHRBcHBJZCI6NzAsImlzcyI6IkRJU1AtUFAiLCJpYXQiOjE1NDA0NTM3MTN9.' +
          'ZBbmW4CVvYbdZlfYKgjcbgT_ZnFV7pXhhARBnovvd_c';
        break;
      }
      case 'fp': {
        this.apiUrl = 'https://dispfp.in.ep.europa.eu/disp/api/v1/';
        this.apiAuthorization = 'bearer eyJhbGciOiJIUzI1NiJ9.' +
          'eyJleHRBcHBOYW1lIjoiRElTUC1DbGllbnQiLCJleHRBcHBJZCI6NDUsImlzcyI6IkRJU1AtRlAiLCJpYXQiOjE1NDI5NjYyMzR9.' +
          'mKpW55fZxp8XcOPDiHqvz_Dk9aUpeAExHXpLQUaQnU4';
        break;
      }
      case '': {
        this.apiUrl = 'https://disp.in.ep.europa.eu/disp/api/v1/';
        this.apiAuthorization = 'bearer eyJhbGciOiJIUzI1NiJ9.' +
          'eyJleHRBcHBOYW1lIjoiRElTUC1DbGllbnQiLCJleHRBcHBJZCI6NDUsImlzcyI6IkRJU1AtUFIiLCJpYXQiOjE1NDA5ODMzMTB9.' +
          'd3i2-81TH5-yNEbX9Pk8DQrepTaz9CqlwGSYUA2TJfQ';
        break;
      }
      default: {
        this.apiUrl = environment.apiUrl; // Localhost if we are using localhost, otherwise it's Prod
        this.apiAuthorization = 'bearer eyJhbGciOiJIUzI1NiJ9.' +
          'eyJleHRBcHBOYW1lIjoiRElTUC1DbGllbnQiLCJleHRBcHBJZCI6ODcyLCJpc3MiOiJESVNQLURWIiwiaWF0IjoxNTMwNTQ2OTY5fQ.' +
          'jdDO52i8bccq5rM1V91axRXlMmmz7vPMyFppgmvDEiU';
      }
    }

    return '';
  }

  /**
   * In case of need in any other place that is not a service
   */
  public getApiToken(): string {
    return this.apiAuthorization;
  }

  public getTokenActivated(): string {
    return environment.tokenActivated;
  }

  protected addFiltersToHttpParams(filters: FilterField[] = null, httpParams: HttpParams): HttpParams {
    // Filters
    if (filters && filters.length > 0) {
      filters.forEach(filter => {
        filter.text = this.replaceByEntityField(filter.text);
        httpParams =  httpParams.append(filter.text, filter.value);
      });
    }

    return httpParams;
  }

  /**
   * To be overrided if there are fields we use for filtering, that are different between the entity and the model
   * When a property has a different name in the Model other than the one in the Entity
   * @param field property to check if we need to rename
   */
  protected replaceByEntityField(field: string): string {
    return field;
  }

  /**
   * Returns an object of type HttpParams with the 'page' and 'size' keys already filled with the passed parameters
   * @param pageIndex to be filled in the HttpParams
   * @param pageSize to be filled in the HttpParams
   */
  protected getDefaultsHttpParams(pageIndex: number, pageSize: number): HttpParams {
    return new HttpParams()
      .append('page', `${pageIndex}`)
      .append('size', `${pageSize}`);
  }

}
