import { SignatureType } from './signature-type.model';
import { TemplateAssociation } from './template-association.model';
import { TemplateThirdParty } from './template-third-party.model';

export interface Template {

  id: number;
  creationDate: Date;
  signatureType: SignatureType;
  status: number;
  templateAssociations: TemplateAssociation[];
  templateThirdParty: TemplateThirdParty[];
  title: string;
}
