import {SignatureMode} from './signature-mode.model';
import {SignatureType} from './signature-type.model';

export interface AllowedMode {

  id: number;
  signatureMode: SignatureMode;
  signatureType: SignatureType;
}
