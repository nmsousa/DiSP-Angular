import {Group} from './group.model';
import {SignatureType} from './signature-type.model';

export interface AllowedGroup {

  id: number;
  group: Group;
  signatureType: SignatureType;
}
