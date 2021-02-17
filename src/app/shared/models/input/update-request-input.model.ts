import { UpdateAssignmentInput } from './update-assignment-input.model';
import { UpdateAssociationInput } from './update-association-input.model';
import { UpdateDocumentInput } from './update-document-input.model';
import { UpdateMetadataInput } from './update-metadata-input.model';

export class UpdateRequestInput {

  constructor(
    public id: number = 0,
    public open: boolean = false,
    public requestor: string = '',
    public signatureType: string = '',
    public barcodeLocation: string = '',
    public deadline: any = null,
    public externalApplication: string = '',
    public lot: number = 0,
    public document: UpdateDocumentInput = null,
    public metadata: any = {},
    public metadatax: UpdateMetadataInput[] = [],
    public assignments: UpdateAssignmentInput[] = [],
    public associations: UpdateAssociationInput[] = [],
    public userthirdparty: string[] = [],
    public templates: string[] = []
  ) {}

}
