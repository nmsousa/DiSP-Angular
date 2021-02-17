import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Metadata } from './../../../../shared/models/entities/metadata.model';
import { Request } from './../../../../shared/models/entities/request.model';
import { SignatureType } from './../../../../shared/models/entities/signature-type.model';
import { PersonOption } from './../../../../shared/models/person-option';
import { DialogCanDeactivateService } from './../../../../shared/services/dialog-can-deactivate.service';
import { GlobalService, MessageSeverity } from './../../../../shared/services/global.service';
import { RequestAssociationArrays, RequestService } from './../../../../shared/services/request.service';
import { DateUtils } from './../../../../shared/utils/date.utils';

@Component({
  selector: 'app-edit-request',
  templateUrl: './edit-request.component.html',
  styleUrls: ['./edit-request.component.less']
})
export class EditRequestComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  request: Request;
  form: FormGroup;
  isLoading: boolean;
  signatureTypes: Array<{ links: [], content: SignatureType }> = [];
  selectedSignatureType: SignatureType;
  deadlineTime: Date;
  isFormReady: boolean = false;
  hasChanges: boolean = false;

  securityAndRoles: any[] = [];
  signatories: PersonOption[] = [];
  metadata: Metadata[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialogCanDeactivateService: DialogCanDeactivateService,
    private requestService: RequestService,
    private globalService: GlobalService) {
  }

  ngOnInit() {
    this.getRequestByRouteId();
  }

  getRequestByRouteId(): void {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.isLoading = true;

      // Get the request
      this.subscriptions.push(this.requestService.getRequest(params['id'])
        .pipe(finalize(() => {
          this.isLoading = false;
        }))
        .subscribe(result => {
          if (result) {
            this.request = result.content;

            this.setRequestData();
          }
        }));
    }));
  }

  protected setRequestData(): void {
    this.form.patchValue({
      document: {
        title: this.request.document.title,
        data: this.request.document.data,
        filename: this.request.document.filename,
        mimetype: this.request.document.mimetype,
        size: this.request.document.size
      }
    });

    // This Date object contains both Date and Time,
    // although DatePicker only uses the Date and TimePicker only uses the Time
    if (this.request.deadline) {
      const deadline: Date = DateUtils.getDateObjectFromDateTimeString(this.request.deadline);
      this.deadlineTime = deadline;
      this.form.patchValue({ deadline });
    }

    this.selectedSignatureType = this.request.signatureType;
    this.form.patchValue({ signatureType: this.request.signatureType.name });

    this.form.patchValue({ id: this.request.id });
    this.form.patchValue({ open: this.request.open });

    const rolesPerPerson: Map<string, string[]> = new Map();
    this.securityAndRoles = this.requestService.getSecurityAndRolesForList(this.request, rolesPerPerson);
    this.signatories = this.requestService.getSignatoriesForList(this.request);
    this.metadata = this.getMetadataFromRequest();

    this.isFormReady = true;
  }

  getMetadataFromRequest(): any[] {
    const requestMetadata: any[] = [];

    if (this.request.metadata) {
      this.request.metadata.forEach((metadataItem: Metadata) => {
        requestMetadata.push({
          id: metadataItem.id,
          metatype: {
            name: metadataItem.metatype.name
          },
          value: metadataItem.value
        });
      });
    }

    return requestMetadata;
  }

  onFormCreated(form: FormGroup): void {
    this.form = form;
  }

  onSaveHandler(requestAssociationArrays: RequestAssociationArrays): void {
    const request: Request = this.form.value;

    // Get the Time from the TimePicker and set it into the Date Input
    if (this.deadlineTime) {
      request.deadline.setHours(this.deadlineTime.getHours());
      request.deadline.setMinutes(this.deadlineTime.getMinutes());
      request.deadline.setSeconds(0);
    }

    // If we didn't choose a new file, we need to get the old one from the server in order to be able to save the Request
    if (!request.document.data) {
      this.requestService.getRequestDocument(`${this.request.id}`).subscribe(result => {
        if (result && result.content) {
          request.document.data = result.content.data;

          this.updateRequest(request, requestAssociationArrays);
        }
      });
    } else {
      this.updateRequest(request, requestAssociationArrays);
    }

  }

  updateRequest(request: Request, requestAssociationArrays: RequestAssociationArrays): void {
    this.requestService.update(
      request, requestAssociationArrays).subscribe(() => {
        this.hasChanges = false;
        this.globalService.showMessage(MessageSeverity.SUCCESS, 'EDIT_REQUEST.SAVE.SUCCESS');
        this.router.navigateByUrl(`/requests/${this.request.id}`);
      });
  }

  onChanges(hasChanges: boolean): void {
    this.hasChanges = hasChanges;
  }

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no changes
    if (!this.hasChanges) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogCanDeactivateService.confirm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe);
  }

}
