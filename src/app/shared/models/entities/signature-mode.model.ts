import {FileType} from '../enums/file-type.enum';

export interface SignatureMode {

  id: number;
  applet: number;
  description: string;
  dssParams: string;
  fileTypeSupport: FileType;
  name: string;
  path: string;
  pinRequest: number;
  status: number;
  type: number;
}
