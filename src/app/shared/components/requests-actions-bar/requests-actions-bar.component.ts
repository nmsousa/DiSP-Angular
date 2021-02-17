import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'ep-ng-lib';
import { forkJoin, Subscription } from 'rxjs';

import { RequestStatuses } from '../../models/enums/request-statuses.enum';
import { RequestSelection } from '../../models/request-selection';
import { GlobalService, MessageSeverity } from '../../services/global.service';
import { RequestActions, RequestService } from '../../services/request.service';

@Component({
  selector: 'app-requests-actions-bar',
  templateUrl: './requests-actions-bar.component.html',
  styleUrls: ['./requests-actions-bar.component.less']
})
export class RequestsActionsBarComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  requestSelection: RequestSelection = { requests: [], ids : [] };
  isPurgeModalVisible: boolean = false;
  purgeComment: string = '';

  constructor(
    private router: Router,
    private requestService: RequestService,
    private globalService: GlobalService,
    private modalService: ModalService) { }

  ngOnInit() {
    this.subscriptions.push(this.requestService.requestSelectionChange$.subscribe(requestSelection => {
      this.requestSelection = requestSelection;
    }));
  }

  /* EDIT */
  onEditClicked(): void {
    if (this.requestService.isRequestSelectionValid(RequestActions.EDIT, this.requestSelection)) {
      this.router.navigateByUrl(`/requests/${this.requestSelection.ids[0]}/edit`);
    }
  }

  /* SENT */

  onSendClicked(): void {
    if (this.requestService.isRequestSelectionValid(RequestActions.SEND, this.requestSelection)) {

      this.subscriptions.push(
        forkJoin(this.requestService.updateRequestsStatus(this.requestSelection.ids, RequestStatuses.SENT)).subscribe(() => {
          this.globalService.showMessage(MessageSeverity.SUCCESS, 'REQUESTS_ACTION_BAR.REQUEST.SENT.SUCCESS');

          this.refreshRequestsTable();
        })
      );

    }
  }

  /* CANCEL */

  onCancelClicked(): void {
    if (this.requestService.isRequestSelectionValid(RequestActions.CANCEL, this.requestSelection)) {

      this.subscriptions.push(this.globalService.getTranslation([
          'REQUESTS_ACTION_BAR.PROMPT.MULTI-CANCEL.CONFIRMATION',
          'PROMPT.YES',
          'PROMPT.NO'
        ]
      ).subscribe((result: string) => {
        this.modalService.confirm({
          epWrapClassName: 'vertical-center-modal',
          epTitle: result['REQUESTS_ACTION_BAR.PROMPT.MULTI-CANCEL.CONFIRMATION'],
          epOkText: result['PROMPT.YES'],
          epOkType: 'danger',
          epCancelText: result['PROMPT.NO'],
          epOnOk: () => this.onCancelConfirmed()
        });
      }));

    }
  }

  onCancelConfirmed(): void {
    this.subscriptions.push(
      forkJoin(this.requestService.updateRequestsStatus(this.requestSelection.ids, RequestStatuses.CANCELED)).subscribe(() => {
        this.globalService.showMessage(MessageSeverity.SUCCESS, 'REQUESTS_ACTION_BAR.REQUEST.CANCELED.SUCCESS');

        this.refreshRequestsTable();
      })
    );
  }

  /* ARCHIVE */

  onArchiveClicked(): void {
    if (this.requestService.isRequestSelectionValid(RequestActions.ARCHIVE, this.requestSelection)) {

      this.subscriptions.push(this.globalService.getTranslation([
          'REQUESTS_ACTION_BAR.PROMPT.MULTI-ARCHIVE.CONFIRMATION',
          'PROMPT.YES',
          'PROMPT.NO'
        ]
      ).subscribe((result: string) => {
        this.modalService.confirm({
          epWrapClassName: 'vertical-center-modal',
          epTitle: result['REQUESTS_ACTION_BAR.PROMPT.MULTI-ARCHIVE.CONFIRMATION'],
          epOkText: result['PROMPT.YES'],
          epOkType: 'danger',
          epCancelText: result['PROMPT.NO'],
          epOnOk: () => this.onArchiveConfirmed()
        });
      }));

    }
  }

  onArchiveConfirmed() {
    this.subscriptions.push(
      forkJoin(this.requestService.archiveRequests(this.requestSelection.ids)).subscribe(() => {
        this.globalService.showMessage(MessageSeverity.SUCCESS, 'REQUESTS_ACTION_BAR.REQUEST.ARCHIVED.SUCCESS');

        this.refreshRequestsTable();
      })
    );
  }

  /* PURGE */

  onPurgeClicked(): void {
    if (this.requestService.isRequestSelectionValid(RequestActions.PURGE, this.requestSelection)) {

      this.subscriptions.push(this.globalService.getTranslation([
          'REQUESTS_ACTION_BAR.PROMPT.MULTI-PURGE.CONFIRMATION',
          'PROMPT.YES',
          'PROMPT.NO'
        ]
      ).subscribe((result: string) => {
        this.modalService.confirm({
          epWrapClassName: 'vertical-center-modal',
          epTitle: result['REQUESTS_ACTION_BAR.PROMPT.MULTI-PURGE.CONFIRMATION'],
          epOkText: result['PROMPT.YES'],
          epOkType: 'danger',
          epCancelText: result['PROMPT.NO'],
          epOnOk: () => this.isPurgeModalVisible = true
        });
      }));

    }
  }

  onPurgeConfirmed(): void {
    // The Comment field is mandatory
    if (this.purgeComment) {
      this.subscriptions.push(
        forkJoin(this.requestService.purgeRequests(this.requestSelection.ids, this.purgeComment)).subscribe(() => {
          this.closePurgeModal();
          this.globalService.showMessage(MessageSeverity.SUCCESS, 'REQUESTS_ACTION_BAR.REQUEST.PURGED.SUCCESS');

          this.refreshRequestsTable();
        })
      );
    } else {
      this.globalService.showMessage(MessageSeverity.INFO, 'REQUESTS_ACTION_BAR.PURGE.COMMENT.EMPTY');
    }
  }

  onClickDownloadPurge(): void {
    if (this.requestSelection.ids) {
      if (this.requestSelection.ids.length === 1) {
        // Download a file from a single request
        this.subscriptions.push(this.requestService.downloadRequestFile(this.requestSelection.ids[0]).subscribe());
      } else if (this.requestSelection.ids.length > 1) {
        this.subscriptions.push(forkJoin(this.requestService.downloadRequestsFile(this.requestSelection.ids)).subscribe(results => {
          // Download a zip file containing multiple request files
          this.requestService.downloadZipFile(results);
        }));
      }
    }
  }

  closePurgeModal(): void {
    this.purgeComment = ''; // Clear the comment in the modal
    this.isPurgeModalVisible = false;
  }

  private refreshRequestsTable() {
    this.requestService.requestsChanged$.next();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
