import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { GlobalService } from './global.service';

/**
 * Async modal dialog service
 * DialogService makes this app easier to test by faking this service.
 */
@Injectable({
  providedIn: 'root',
})
export class DialogCanDeactivateService {

  // confirmModal?: NzModalRef;

  constructor(private globalService: GlobalService) { }

  /**
   * Ask user to confirm an action. `message` explains the action and choices.
   * Returns observable resolving to `true`=confirm or `false`=cancel
   */
  confirm(): Observable<boolean> {

    // This doesn't return an Observable!
    // this.confirmModal = this.modalService.confirm({
    //   nzTitle: 'Unsaved changes',
    //   nzContent: message,
    //   nzOnOk: () => of(true),
    //   nzOnCancel: () => of(false)
    // });

    let confirmation: any;
    this.globalService.getTranslation('GENERIC.UNSAVED_CHANGES.MSG').subscribe(result => {
      confirmation = window.confirm(result || 'Discard changes?');
    });

    return of(confirmation);
  }

}
