import { SecurityRole } from './../enums/security-role.enum';

export class NewAssociationInput {

  constructor(
    public roleInRequest: SecurityRole = null,
    public user: string = '',
    public requestId: number = 0
  ) {}

}
