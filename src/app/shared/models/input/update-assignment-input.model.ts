export class UpdateAssignmentInput {

  constructor(
    public id: number = 0,
    public signatory: string = '',
    public deadline: Date = null,
    public order: number = 0,
    public signatureReason: string = ''
  ) {}

}
