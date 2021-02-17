import {Request} from './request.model';

export interface UserThirdParty {

  id: number;
  email: string;
  request: Request;
}
