export interface SignedDocument {

  id: number;
  certChain: string;
  data: number[];
  filename: string;
  mimetype: string;
  size: number;
}
