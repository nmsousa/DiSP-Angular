import { NewAssignmentInput } from './new-assignment-input.model';
import { NewAssociationInput } from './new-association-input.model';
import { NewDocumentInput } from './new-document-input.model';
import { NewMetadataInput } from './new-metadata-input.model';

export class NewRequestInput {

  constructor(
    public open: boolean = false,
    public requestor: string = '',
    public signatureType: string = '',
    public barcodeLocation: string = '',
    public deadline: any = null,
    public externalApplication: string = '',
    public lot: number = 0,
    public document: NewDocumentInput = null,
    public metadata: any = {},
    public metadatax: NewMetadataInput[] = [],
    public assignments: NewAssignmentInput[] = [],
    public associations: NewAssociationInput[] = [],
    public userthirdparty: string[] = [],
    public templates: string[] = []
  ) {}

}
