import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {UpdateSignatureTypeInput} from '../models/input/update-signature-type-input.model';
import {BaseRemoteService} from './base-remote.service';

@Injectable({
  providedIn: 'root'
})
export class SignatureTypesService extends BaseRemoteService {

  emptySignatureTypeError: string = 'Signature Type must not be null';

  constructor(injector: Injector) {
    super(injector);
  }

  // Get all the Signature Types
  public getAll(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}admin/signatureTypes`);
  }

  public update(signatureType: any): Observable<any> {
    if (!signatureType) {
      throw new Error(this.emptySignatureTypeError);
    }

    // Copy from SignatureType to UpdateSignatureTypeInput all the properties that exist also in UpdateSignatureTypeInput
    const updateSignatureTypeInput: UpdateSignatureTypeInput = new UpdateSignatureTypeInput();
    Object.keys(updateSignatureTypeInput).forEach(key => {
      // Update only the non array fields
      if (signatureType[key] instanceof Array === false) {
        if (key === 'keyType') {
          updateSignatureTypeInput[key] = signatureType[key].name;
        } else if (key === 'recommendedMode') {
          updateSignatureTypeInput[key] = this.getRecommendedSignatureModeName(signatureType);
        } else  {
          updateSignatureTypeInput[key] = signatureType[key];
        }
      }
    });

    // Copy AllowedGroups
    if (signatureType.allowedGroups) {
      signatureType.allowedGroups.forEach(allowedGroup => {
        if (allowedGroup.group && allowedGroup.group.shortName) {
          updateSignatureTypeInput.allowedGroups.push(allowedGroup.group.shortName);
        }
      });
    }
    // Copy AllowedModes
    if (signatureType.allowedModes) {
      signatureType.allowedModes.forEach(allowedMode => {
        if (allowedMode.signatureMode && allowedMode.signatureMode.name) {
          updateSignatureTypeInput.allowedModes.push(allowedMode.signatureMode.name);
        }
      });
    }
    // Copy Trusted Authorities
    if (signatureType.trustedAuthorities) {
      signatureType.trustedAuthorities.forEach(trustedAuthority => {
        if (trustedAuthority.authority && trustedAuthority.authority.commonName) {
          updateSignatureTypeInput.trustedAuthorities.push(trustedAuthority.authority.commonName);
        }
      });
    }

    return this.http.put<any>(this.apiUrl + `admin/signatureTypes/${signatureType.id}`, updateSignatureTypeInput);
  }

  public getRecommendedSignatureModeName(signatureType: any): string {
    let recommendedSignatureModeName: string = '';

    if (signatureType && signatureType.allowedModes) {
      // We are looping through allowed signature modes until we find the one we want by the id and then we return it's name
      for (const allowedMode of signatureType.allowedModes) {
        if (allowedMode.signatureMode && allowedMode.signatureMode['@jsonTag'] === signatureType.recommendedMode) {
          recommendedSignatureModeName = allowedMode.signatureMode.name;
          break;
        }
      }
    }

    return recommendedSignatureModeName;
  }
}
