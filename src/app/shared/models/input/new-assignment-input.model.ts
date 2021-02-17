export class NewAssignmentInput {

  constructor(
    public requestId: number = 0,
    public signatory: string = '',
    public deadline: Date = null,
    public order: number = 0,
    public signatureReason: string = ''
  ) {}

}
