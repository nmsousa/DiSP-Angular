import { CdkDragEnd } from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PDFSource, PdfViewerComponent } from 'ng2-pdf-viewer';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { GlobalService, MessageSeverity } from 'src/app/shared/services/global.service';
import { RequestService } from 'src/app/shared/services/request.service';

@Component({
  selector: 'app-request-locate-signature',
  templateUrl: './request-locate-signature.component.html',
  styleUrls: ['./request-locate-signature.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class RequestLocateSignatureComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild('perfectScrollBarRef', { static: false }) perfectScrollBarRef?: PerfectScrollbarComponent;
  @ViewChild('pdfViewerComponentRef', { static: false }) pdfViewerComponentRef?: PdfViewerComponent;
  @ViewChild('placeholder', { static: false }) placeholder: ElementRef;

  subscriptions: Subscription[] = [];

  isLoading: boolean = false;
  pdfSrc: string | Uint8Array | PDFSource = '';
  requestId: number = 0;
  placeHolderVisible: boolean = false;
  signaturePlaceholderHeight: number = 59; // signature-placeholder.png height
  x = 0;
  y = 0;
  scrollPositionY: any = 0;
  pdfViewContainerHeight: number = 0;
  numPages: number = 0;
  page: number = 1;
  pageHeight: number = 0;
  pageWidth: number = 400;
  barcodeLocation: string = '';

  // Zoom

  zoom_levels: number[] = [0.5, 0.65, 0.75, 1];
  zoomIndex: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    private globalService: GlobalService,
    private requestService: RequestService) { }

  ngOnInit(): void {
    this.getPDFByRequestId();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        if (propName === 'pdfSrc') {
          this.pdfSrc = this.convertBase64ToBinary(this.pdfSrc);
        }
      }
    }
  }

  private getPDFByRequestId(): void {
    this.isLoading = true;

    this.subscriptions.push(this.route.params.subscribe(params => {
      this.requestId = params['id'];
      // Get the request
      this.subscriptions.push(this.requestService.findOriginalVersionOfTheDocumentByRequestId(this.requestId)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(result => {
        if (result && result.content && result.content.data) {
          this.pdfSrc = this.convertBase64ToBinary(result.content.data);
        } else {
          this.globalService.showMessage(MessageSeverity.ERROR, 'GENERIC.SERVER.ERROR'); // Create a more specific error msg
        }
      }));
    }));
  }

  public zoomIn()
	{
    if (this.zoomIndex < this.zoom_levels.length - 1) {
      this.zoomIndex++;
      this.changePsContentMargin();
    }
	}

	public zoomOut()
	{
    if (this.zoomIndex > 0) {
      this.zoomIndex--;
      this.changePsContentMargin();
    }
	}

  changePsContentMargin() {
    // Get the div inside the perfect-scrollbar
    const element = (<HTMLElement>this.perfectScrollBarRef.directiveRef.elementRef.nativeElement)
      .querySelector('.placeholder-boundary .ps-content');

    if (element) {
      this.renderer.setStyle(element, 'margin-top',
        `${Math.round(-this.signaturePlaceholderHeight * this.zoom_levels[this.zoomIndex])}px`);
    }
  }

  convertBase64ToBinary(base64: string | Uint8Array | PDFSource): string | Uint8Array | PDFSource  {
    let result: any = base64;

    if (typeof base64 === 'string') {
      var raw = window.atob(base64);
      var rawLength = raw.length;
      result = new Uint8Array(new ArrayBuffer(rawLength));

      for(let i = 0; i < rawLength; i++) {
        result[i] = raw.charCodeAt(i);
      }
    }

    return result;
  }

  afterLoadComplete(pdfData: any) {
    this.numPages = pdfData.numPages;

    this.changePsContentMargin();
  }

  pageRendered(e: CustomEvent | any) {
    this.pageWidth = e.source.viewport.width;

    // If we just changed the zoom
    if (this.zoomIndex !== 1) {
      this.calcPdfContainerHeight();
    }
  }

  calcPdfContainerHeight(): void {
    if (this.placeholder) {
      this.pdfViewContainerHeight = this.pdfViewerComponentRef.pdfViewerContainer.nativeElement.clientHeight;
      this.pageHeight = this.pdfViewContainerHeight / this.numPages;
    }
  }

  public onScrollEvent(event: any): void {
    this.scrollPositionY = this.perfectScrollBarRef.directiveRef.position(true).y;
  }

  autoPositionPlaceholder(): void {
    // If placeholder is visible and was never dragged
    this.calcPdfContainerHeight();
    if (this.scrollPositionY === 0) {
      this.positionPlaceHolderY(this.placeholder.nativeElement.height);
    } else {
      this.positionPlaceHolderY(this.scrollPositionY);
    }

    this.calcBarcodeLocation();
  }

  positionPlaceHolderY(y: number): void {
    this.placeholder.nativeElement.style.transform = `translate3d(${this.x}px, ${y}px, 0px)`;
  }

  positionPlaceHolderPage(page: number): void {
    this.calcPdfContainerHeight();
    this.positionPlaceHolderY((-this.pdfViewContainerHeight / this.numPages) * page);
  }

  public dragEnded(event: CdkDragEnd) {
    let element = event.source.getRootElement();
    let boundingClientRect: any = element.getBoundingClientRect();
    let parentPosition = this.getPosition(element);
    this.x = Math.round(boundingClientRect.x - parentPosition.left);
    this.y = Math.round(boundingClientRect.y - parentPosition.top - this.placeholder.nativeElement.height);

    // To avoid going above the limits
    if (this.y + this.scrollPositionY <= 0) {
      this.y = 0;
      this.positionPlaceHolderY(this.placeholder.nativeElement.height);
    }

    this.page = Math.ceil((this.y + this.scrollPositionY) / this.pageHeight);
    this.page = this.page < 1 ? 1 : this.page;

    this.calcBarcodeLocation();
  }


  /**
   * Example: "barcodeLocation":"1:150x130"
   * 1 = PAGE NUMBER OF THE DOCUMENT
   * 150 = X
   * 130 = Y
   */
  calcBarcodeLocation(): void {
    let pageRelativePositionY: number = (this.y + this.scrollPositionY) % this.pageHeight;
    this.barcodeLocation = `${this.page}:${Math.round(this.x)}x${Math.round(pageRelativePositionY)}`;
  }

  getPosition(el: any) {
    let x = 0;
    let y = 0;
    while(el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: y, left: x };
  }

  onSaveHandler(): void {
    this.subscriptions.push(
      this.requestService.updateRequestBarcodeLocation(this.requestId, this.barcodeLocation).subscribe(result => {
        if (result) {
          this.globalService.showMessage(MessageSeverity.SUCCESS, 'REQUEST.LOCATE_SIGNATURE.SAVE.SUCCESS');
        }
      })
    );
  }

  onCancel(): void {
    // Navigates to the Requests Page
    this.router.navigateByUrl(`/requests`);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
