import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SignatureModesService } from '../../services/signature-modes.service';

@Component({
  selector: 'app-signature-modes',
  templateUrl: './signature-modes.component.html'
})
export class SignatureModesComponent implements OnInit {

  signatureModes$: Observable<any>;

  constructor(private signatureModesService: SignatureModesService) { }

  ngOnInit(): void {
    this.signatureModes$ = this.signatureModesService.getAll();
  }

}
