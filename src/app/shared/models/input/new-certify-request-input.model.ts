import { CertificationPermission } from './../enums/certification-permission.enum';
import { DigestAlgorithm } from './../enums/digest-algorithm.enum';

export class NewCertifyRequestInput {

  constructor(
    public fileName: string = '',
    public data: Uint8Array[] = [], // byte[]
    public digestAlgorithm: DigestAlgorithm = DigestAlgorithm.SHA512,
    public certificationPermission: CertificationPermission = CertificationPermission.MINIMAL_CHANGES_PERMITTED,
    public username: string = ''
  ) {}

}
