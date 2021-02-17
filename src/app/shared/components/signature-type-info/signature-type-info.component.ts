import { Component, Input, OnInit } from '@angular/core';

import { SignatureType } from './../../models/entities/signature-type.model';
import { SignatureTypesService } from './../../services/signature-types.service';

@Component({
  selector: 'app-signature-type-info',
  templateUrl: './signature-type-info.component.html',
  styleUrls: ['./signature-type-info.component.less']
})
export class SignatureTypeInfoComponent implements OnInit {

  @Input()
  signatureType: SignatureType;

  constructor(private signatureTypesService: SignatureTypesService) { }

  ngOnInit() {
  }

  public getRecommendedSignatureModeName(signatureType: any): string {
    return this.signatureTypesService.getRecommendedSignatureModeName(signatureType);
  }

}
