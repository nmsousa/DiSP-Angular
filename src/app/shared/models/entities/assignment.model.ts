import {AssignmentStatuses} from '../enums/assignment-statuses.enum';
import {SignatureMode} from './signature-mode.model';
import {SignedDocument} from './signed-document.model';
import {User} from './user.model';

export interface Assignment {

  id: number;
  commonName: string;
  deadline: Date;
  eventDate: Date;
  invited: boolean;
  isAuthorityTrusted: boolean;
  isDocumentRead: boolean;
  order: number;
  refusingReason: string;
  rejectionReason: string;
  request: Request;
  signatory: User;
  signatureMode: SignatureMode;
  signatureReason: string;
  signedDocument: SignedDocument;
  status: AssignmentStatuses;
  validAtTimeOfSigning: boolean;
}
