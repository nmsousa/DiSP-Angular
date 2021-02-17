import {Authority} from './authority.model';
import {SignatureType} from './signature-type.model';

export interface TrustedAuthority {

  id: number;
  authority: Authority;
  signatureType: SignatureType;
}
