import { SecurityRole } from './enums/security-role.enum';

export class PersonOption {

  constructor(
    public username: string = '',
    public label: string = '',
    public epId: number = 0,
    public roles: Array<{role: SecurityRole, active: boolean}> = [],
    public deadline: Date = null
  ) {}
}
