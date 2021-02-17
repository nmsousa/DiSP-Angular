import {SecurityRole} from '../enums/security-role.enum';
import {Request} from './request.model';
import {User} from './user.model';

export interface Association {

  id: number;
  creationDate: Date;
  request: Request;
  roleInRequest: SecurityRole;
  user: User;
}
