import {NewRestPrincipalInput} from './new-rest-principal-input.model';

export class NewRestPrincipalInputPurgeRequest extends NewRestPrincipalInput {

  constructor(public comment: string = '', public username: string = '') {
    super(username);
  }
      
}
