import { NewTemplateAssociationInput } from './new-template-association-input.model';
import { NewTemplateThirdPartyInput } from './new-template-thirdparty-input.model';

export class NewTemplateInput {

  constructor(
    public title: string = '',
    public signatureType: string = '',
    public status: number = 1,
    public templateAssociations: NewTemplateAssociationInput[] = [],
    public templateThirdParty: NewTemplateThirdPartyInput[] = []
  ) {}
}
