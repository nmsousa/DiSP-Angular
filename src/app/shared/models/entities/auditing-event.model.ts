import { AlertLevel } from './../enums/alert-level.enum';
import { AuditingEventType } from './auditing-event-type.model';

export interface AuditingEvent {

  id: number;
  occurredDate: Date;
  description: string;
  level: AlertLevel;
  lotId: number;
  requestId: number;
  type: AuditingEventType;
  username: string;
  requestTitle: string;
  requestDeadline: Date;
  userGroups: string[];
  signatureType: string;
}
