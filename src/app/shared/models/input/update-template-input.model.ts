import { UpdateTemplateAssociationInput } from './update-template-association-input.model';
import { UpdateTemplateThirdPartyInput } from './update-template-thirdparty-input.model';

export class UpdateTemplateInput {

  constructor(
    public id: number = 0,
    public signatureType: string = '', // Signature name
    public status: number = 0,
    public title: string = '',
    public templateAssociations: UpdateTemplateAssociationInput[] = [],
    public templateThirdParty: UpdateTemplateThirdPartyInput[] = []
  ) {}

}
