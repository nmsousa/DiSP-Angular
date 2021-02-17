import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Request } from './../../../../shared/models/entities/request.model';
import { RequestStatuses } from './../../../../shared/models/enums/request-statuses.enum';
import { DialogCanDeactivateService } from './../../../../shared/services/dialog-can-deactivate.service';
import { GlobalService, MessageSeverity } from './../../../../shared/services/global.service';
import { RequestAssociationArrays, RequestService } from './../../../../shared/services/request.service';

@Component({
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.less']
})
export class NewRequestComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  form: FormGroup;
  deadlineTime: Date;
  hasChanges: boolean = false;

  constructor(
    private router: Router,
    private dialogCanDeactivateService: DialogCanDeactivateService,
    private globalService: GlobalService,
    private requestService: RequestService) {}

  ngOnInit() {}

  onFormCreated(form: FormGroup): void {
    this.form = form;
  }

  onSaveHandler(requestAssociationArrays: RequestAssociationArrays): void {
    const sendRequest: boolean = this.form.value.sendRequest;
    delete this.form.value.sendRequest; // We remove this property because it's not actually part of a Request entity
    const request: Request = this.form.value;

    // Get the Time from the TimePicker and set it into the Date Input
    if (this.deadlineTime) {
      request.deadline.setHours(this.deadlineTime.getHours());
      request.deadline.setMinutes(this.deadlineTime.getMinutes());
      request.deadline.setSeconds(0);
    }

    this.subscriptions.push(
      this.requestService.create(request, requestAssociationArrays).subscribe(result => {

        this.hasChanges = false;
        // If the checkbox to send the request after creation is active
        if (sendRequest) {
          this.updateRequestStatus(result.content.id);
        }

        this.globalService.showMessage(MessageSeverity.SUCCESS, 'NEW_REQUEST.SAVE.SUCCESS');
        this.router.navigateByUrl(`/requests/${result.content.id}`);
      })
    );
  }

  updateRequestStatus(requestId: any): void {
    const observables: Array<Observable<any>> = this.requestService.updateRequestsStatus([requestId], RequestStatuses.SENT);

    if (observables && observables.length > 0) {
      this.subscriptions.push(observables[0].subscribe(() => {}));
    }
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
