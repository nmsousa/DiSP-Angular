import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CertificationPermission } from './../../../../shared/models/enums/certification-permission.enum';
import { GlobalService, MessageSeverity } from './../../../../shared/services/global.service';
import { DocumentService } from './../../services/document.service';

@Component({
  selector: 'app-certify-document',
  templateUrl: './certify-document.component.html',
  styleUrls: ['./certify-document.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CertifyDocumentComponent implements OnInit, OnDestroy {

  @ViewChild('fileInput', {static: false})
  fileInput: ElementRef;

  subscriptions: Subscription[] = [];
  CertificationPermission = CertificationPermission;
  form: FormGroup;
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private globalService: GlobalService,
    private documentService: DocumentService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      data: [null, [Validators.required]],
      fileName: [''],
      certificationPermission: [CertificationPermission.MINIMAL_CHANGES_PERMITTED, [Validators.required]]
    });
  }

  onFileChange(event) {
    const reader: FileReader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      // File size > 20MB
      if (file.size > 20971520) {
        this.fileInput.nativeElement.value = ''; // Clear the selected file that is too big
        this.globalService.showMessage(MessageSeverity.ERROR, 'CERTIFY_DOCUMENT.ERROR.FILE_SIZE');
      } else { // File size <= 20MB
          reader.onload = () => {
            this.form.patchValue({
              data: reader.result,
              fileName: file.name
            });
          };
        }
    } else {
      this.form.patchValue({
        data: null,
        fileName: ''
      });
    }

  }

  onCertify(): void {
    if (!this.isSaving) {
      this.isSaving = true;
      this.subscriptions.push(this.documentService.certify(this.form.value).pipe(
        finalize(() => {
          this.isSaving = false;
        })
      )
        .subscribe(() => {
        })
      );
    }

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
