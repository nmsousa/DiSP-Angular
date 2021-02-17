import { ApiFieldError } from './api-field-error.model';
import { ApiGlobalError } from './api-global-error.model';

export class ApiErrorsView {

  constructor(
    public fieldErrors: ApiFieldError[] = [],
    public globalErrors: ApiGlobalError[] = [],
    public invocationDate: Date) {}
}
