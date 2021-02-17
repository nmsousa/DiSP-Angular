import { SecurityRole } from './../enums/security-role.enum';
import { Template } from './template.model';
import { User } from './user.model';

export interface TemplateAssociation {

  id: number;
  assignmentOrder: number;
  role: SecurityRole;
  template: Template;
  user: User;
}
