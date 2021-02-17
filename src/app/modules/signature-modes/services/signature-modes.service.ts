import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BaseRemoteService} from '../../../shared/services/base-remote.service';

@Injectable({
  providedIn: 'root'
})
export class SignatureModesService extends BaseRemoteService {

  constructor(injector: Injector) {
    super(injector);
  }

  // Get all the Signature Modes
  getAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'admin/signatureModes')
      .pipe(
        map((res: any) => {
          // Sort by name ASC
          return res.content ? res.content.sort((a, b) => (a.content.name > b.content.name) ? 1 : -1) : [];
        })
      );
  }

}
