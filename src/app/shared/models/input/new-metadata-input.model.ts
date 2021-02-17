export class NewMetadataInput {

  constructor(
    public requestId: number = 0,
    public metatype: string = '',
    public value: string = ''
  ) {}

}
