import { SecurityRole } from './../enums/security-role.enum';

export class UpdateTemplateAssociationInput {

  constructor(
    public assignmentOrder: number,
    public role: SecurityRole,
    public user: string
  ) {}

}
