export interface ExternalApplication {

  id: number;
  isActive: boolean;
  callbackPut: string;
  callbackUpload: string;
  creationDate: Date;
  email: string;
  name: string;
  token: string;
}
