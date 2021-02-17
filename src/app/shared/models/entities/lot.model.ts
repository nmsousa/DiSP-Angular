import {LotStatuses} from '../enums/lot-statuses.enum';
import {ExternalApplication} from './external-application.model';
import {Request} from './request.model';

export interface Lot {

  id: number;
  externalApplication: ExternalApplication;
  archive: boolean;
  archiveDate: Date;
  purge: boolean;
  purgeDate: Date;
  lotName: string;
  lotTimestamp: string;
  requests: Request[];
  status: LotStatuses;
}
