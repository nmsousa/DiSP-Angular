import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { SignatureTypesService } from '../../../../shared/services/signature-types.service';
import { GlobalService, MessageSeverity } from './../../../../shared/services/global.service';

@Component({
  selector: 'app-signature-types',
  templateUrl: './signature-types.component.html',
  styleUrls: ['./signature-types.component.less']
})
export class SignatureTypesComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  signatureTypes$: Observable<any>;

  constructor(private signatureTypesService: SignatureTypesService, private globalService: GlobalService) { }

  ngOnInit(): void {
    this.signatureTypes$ = this.signatureTypesService.getAll();
  }

  public getRecommendedSignatureModeName(signatureType: any): string {
    return this.signatureTypesService.getRecommendedSignatureModeName(signatureType);
  }

  onChangeStatus(event: any, signatureType: any) {
    signatureType.status = +event.target.checked; // Convert the value from boolean to number
    this.subscriptions.push(this.signatureTypesService.update(signatureType).subscribe(() => {
      this.globalService.showMessage(MessageSeverity.SUCCESS, 'SIGNATURE_TYPES.UPDATE.SUCCESS');
    }));
  }

  onChangeVisibility(event: any, signatureType: any) {
    signatureType.visible = +event.target.checked; // Convert the value from boolean to number
    this.subscriptions.push(this.signatureTypesService.update(signatureType).subscribe(() => {
      this.globalService.showMessage(MessageSeverity.SUCCESS, 'SIGNATURE_TYPES.UPDATE.SUCCESS');
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
