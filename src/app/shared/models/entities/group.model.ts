import {User} from './user.model';

export interface Group {

  id: number;
  epId: number;
  shortName: string;
  fullName: string;
  groupType: string;
  isActive: boolean;
  users: User[];
}
