import {User} from './user.model';

export interface UserDetails {

  id: number;
  building: string;
  office: string;
  phone: string;
  user: User;
}
