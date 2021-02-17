import { SecurityRole } from '../enums/security-role.enum';

export class UpdateAssociationInput {

  constructor(
    public id: number = 0,
    public roleInRequest: SecurityRole = null,
    public user: string = ''
  ) {}

}
