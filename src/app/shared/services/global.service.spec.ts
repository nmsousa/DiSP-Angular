import {TestBed} from '@angular/core/testing';
import {TranslateService} from '@ngx-translate/core';
import {EpNgLibModule, EpNotificationService} from 'ep-ng-lib';
import {of} from 'rxjs';
import {mockPDFData} from '../mocks/pdf-base64.mock';

import {GlobalService} from './global.service';
import SpyObj = jasmine.SpyObj;

describe('GlobalService', () => {

  let service: GlobalService;
  let translateServiceSpy: SpyObj<TranslateService>;

  beforeEach(() => {
    // https://angular.io/guide/testing#services-with-dependencies
    const spy = jasmine.createSpyObj('TranslateService', ['stream', 'get']);

    TestBed.configureTestingModule({
      imports: [
        EpNgLibModule],
      // Provide both the service-to-test and its (spy) dependency
      providers: [GlobalService, EpNotificationService, {provide: TranslateService, useValue: spy}]

    });

    // Inject both the service-to-test and its (spy) dependency
    service = TestBed.get(GlobalService);
    translateServiceSpy = TestBed.get(TranslateService);
  });

  /*** GlobalService method tests begin ***/

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getTranslation()', () => {

    it('#getTranslation() should translate using get()', () => {
      const mockTranslateGet: string = 'Returned text from translateService.get()';

      // Mock TranslateService.get()
      translateServiceSpy.get.and.returnValue(of(mockTranslateGet));

      service.getTranslation('TEST.TRANSLATION').subscribe(res => {
        expect(res).toEqual(mockTranslateGet);
      });
    });

    it('#getTranslation() should translate using stream()', () => {
      const mockTranslateStream: string = 'Returned text from translateService.stream()';

      // Mock TranslateService.stream()
      translateServiceSpy.stream.and.returnValue(of(mockTranslateStream));

      service.getTranslation('TEST.TRANSLATION', null, true).subscribe(res => {
        expect(res).toEqual(mockTranslateStream);
      });
    });

    it('#getTranslation() should be OK using get() with empty key', () => {
      // Mock TranslateService.get()
      translateServiceSpy.get.and.returnValue(of(null));

      service.getTranslation(null, null).subscribe(res => {
        expect(res).toBeNull();
      });
    });
  });

  it('#downloadFile() should download the PDF file', () => {
    const fileData: string = mockPDFData;
    const filename: string = 'sample.pdf';
    const mimeType: string = 'application/pdf';

    // create a spy object with a click() method
    const spyObj = jasmine.createSpyObj('a', ['click']);
    // spy on document.createElement() and return the spy object
    spyOn(document, 'createElement').and.returnValue(spyObj);

    service.downloadFile(fileData, filename, mimeType);
    expect(document.createElement).toHaveBeenCalledTimes(1);
    expect(document.createElement).toHaveBeenCalledWith('a');

    expect(spyObj.href).toBe(`data:${mimeType};base64, ${fileData}`);
    expect(spyObj.download).toBe(filename);
    expect(spyObj.click).toHaveBeenCalledTimes(1);
    expect(spyObj.click).toHaveBeenCalledWith();
  });

});
