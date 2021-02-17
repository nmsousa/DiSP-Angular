import {UserType} from '../enums/user-type.enum';
import {Group} from './group.model';
import {UserDetails} from './user-details.model';
import {UserPreferences} from './user-preferences.model';

export interface User {

  id: number;
  isActive: boolean;
  details: UserDetails[];
  email: string;
  epId: number;
  firstname: string;
  lastname: string;
  fullName: string;
  groups: Group[];
  preferences: UserPreferences;
  userType: UserType;
  username: string;
  role: string; // 'admin' or 'user'
}
