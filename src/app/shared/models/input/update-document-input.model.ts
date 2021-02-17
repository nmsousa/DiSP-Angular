export class UpdateDocumentInput {

  constructor(
    public data: any = null,
    public filename: string = '',
    public mimetype: string = '',
    public size: number = 0,
    public title: string = ''
  ) {}

}
