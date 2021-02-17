import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthenticationService } from '../../../shared/services/authentication.service';
import { NewCertifyRequestInput } from './../../../shared/models/input/new-certify-request-input.model';
import { BaseRemoteService } from './../../../shared/services/base-remote.service';
import { GlobalService } from './../../../shared/services/global.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentService extends BaseRemoteService {

  emptyFormError: string = 'Form must not be null';

  constructor(injector: Injector, private globalService: GlobalService, private authenticationService: AuthenticationService) {
    super(injector);
  }

  public certify(form: any): Observable<any> {
    if (!form) {
      throw new Error(this.emptyFormError);
    }

    const mimetype: string = 'application/pdf';
    // Copy the properties from Form to NewCertifyRequestInput
    const newCertifyRequestInput: NewCertifyRequestInput = new NewCertifyRequestInput();
    newCertifyRequestInput.fileName = form.fileName.replace(/\.[^/.]+$/, ''); // Remove file extension
    newCertifyRequestInput.data = form.data.substr(`data:${mimetype};base64,`.length); // To remove the prefix
    newCertifyRequestInput.certificationPermission = form.certificationPermission;
    newCertifyRequestInput.username = this.authenticationService.getUsername();

    return this.http.post<any>(this.apiUrl + `documents/certify`, newCertifyRequestInput).pipe(
      tap(result => {
        if (result && result.content) {
          this.globalService.downloadFile(result.content.data, newCertifyRequestInput.fileName, mimetype);
        }
      })
    );
  }

}
