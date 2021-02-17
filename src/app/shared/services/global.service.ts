import {Injectable, OnDestroy} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {EpNotificationService} from 'ep-ng-lib';
import {saveAs} from 'file-saver';
import * as JSZip from 'jszip';
import {Observable, Subscription} from 'rxjs';
import {Document} from '../models/entities/document.model';

export enum MessageSeverity {
  SUCCESS = 'success',
  INFO = 'info',
  WARN = 'warning',
  ERROR = 'error',
}

@Injectable({
  providedIn: 'root'
})
export class GlobalService implements OnDestroy {

  subscriptions: Subscription[] = [];

  constructor(private translateService: TranslateService,
              private notificationService: EpNotificationService) { }

  /* Toasts with translated messages */

  public showMessage(severity: MessageSeverity, message: string, title?: string, params?: object) {
    this.subscriptions.push(this.getTranslation(message.toUpperCase(), params).subscribe((result: string) => {
      this.notificationService[severity](
        result,
        title,
        { position: 'top-right' }
      );
    }));
  }

  public getTranslation(key: string | string[], params?: object, stream?: boolean): Observable<any> {
    // Stream means that it will also emit new values whenever the used language changes
    return stream ? this.translateService.stream(key, params) : this.translateService.get(key, params);
  }

  /* File download */

  downloadFile(data: any, filename: string, mimetype: string) {

    // IE 10+ / Edge old versions
    if (navigator.msSaveBlob) {
      const byteCharacters = atob(data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], {type: mimetype});
      navigator.msSaveBlob(blob, `${filename}.pdf`);

    } else {
      const linkSource = `data:${mimetype};base64, ${data}`;
      const downloadLink = document.createElement('a');

      downloadLink.href = linkSource;
      downloadLink.download = filename;
      downloadLink.click();
    }

  }

  downloadZipFile(documents: Document[], filename: string): void {
    const zip = new JSZip();
    documents.forEach(document => {
      zip.file(document.filename, document.data, { base64: true });
    });

    zip.generateAsync({type: 'blob'})
      .then(content => {
        // FileSaver.js
        saveAs(content, filename);
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
