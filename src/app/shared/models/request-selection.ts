import {Request} from '../models/entities/request.model';

export interface RequestSelection {

  requests: Request[];
  ids: string[];

}
