import {DeadlineType} from '../enums/deadline-type.enum';
import {WorkflowTypes} from '../enums/workflow-types.enum';
import {AllowedGroup} from './allowed-group.model';
import {AllowedMode} from './allowed-mode.model';
import {KeyType} from './key-type.model';
import {SignatureMode} from './signature-mode.model';
import {TrustedAuthority} from './trusted-authority.model';

export interface SignatureType {

  id: number;
  allowedGroups: AllowedGroup[];
  allowedModes: AllowedMode[];
  deadlineType: DeadlineType;
  fileRead: boolean;
  icon: string;
  ipCheck: boolean;
  isProtected: boolean;
  keyType: KeyType;
  name: string;
  notificationHoursBeforeDeadline: number;
  recommendedMode: SignatureMode;
  status: number;
  visible: number;
  trustedAuthorities: TrustedAuthority[];
  workflowType: WorkflowTypes;
}
