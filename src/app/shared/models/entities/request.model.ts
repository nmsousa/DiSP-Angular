import {RequestStatuses} from '../enums/request-statuses.enum';
import {Assignment} from './assignment.model';
import {Association} from './association.model';
import {Document} from './document.model';
import {ExternalApplication} from './external-application.model';
import {Lot} from './lot.model';
import {Metadata} from './metadata.model';
import {SignatureType} from './signature-type.model';
import {UserThirdParty} from './user-third-party.model';
import {User} from './user.model';

export interface Request {

  id: number;
  archive: boolean;
  archiveDate: Date;
  purge: boolean;
  purgeDate: Date;
  assignments: Assignment[];
  associations: Association[];
  associationsAsMap: Map<string, Association[]>;
  barcodeLocation: string;
  comments: string;
  creationDate: Date;
  deadline: Date;
  document: Document;
  expired: boolean;
  externalApplication: ExternalApplication;
  lockTime: Date;
  lockedByApplet: boolean;
  lot: Lot;
  metadata: Metadata[];
  open: boolean;
  requestor: User;
  signatureType: SignatureType;
  status: RequestStatuses;
  userthirdparty: UserThirdParty[];
}
