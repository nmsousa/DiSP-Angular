export interface Document {

  id: number;
  convertedFrom: Document;
  data: any;
  creationDate: Date;
  filename: string;
  mimetype: string;
  size: number;
  title: string;
}
