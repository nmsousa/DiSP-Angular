import { SecurityRole } from './../enums/security-role.enum';

export class NewTemplateAssociationInput {

  constructor(
    public assignmentOrder: number = 0,
    public role: SecurityRole = SecurityRole.ROLE_SIGNATORY,
    public user: string = ''
  ) {}
}
