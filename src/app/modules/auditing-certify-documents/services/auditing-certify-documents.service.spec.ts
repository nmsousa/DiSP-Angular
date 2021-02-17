import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FilterField } from './../../../shared/models/filter-field';
import { SortOrder } from './../../../shared/models/sort-config';
import { BACKEND_PAGINATION_DEFAULT } from './../../../shared/services/base-remote.service';
import { GlobalService } from './../../../shared/services/global.service';
import { DateUtils } from './../../../shared/utils/date.utils';
import { mockExportAuditFile } from './../../auditing-events/mocks/export-audit-file.mock';
import { mockAuditingCertifyDocs } from './../mocks/auditing-certify-documents.mock';
import { AuditingCertifyDocumentsService } from './auditing-certify-documents.service';

import SpyObj = jasmine.SpyObj;

describe('AuditingCertifyDocumentsService', () => {

  let httpMock: HttpTestingController;
  let service: AuditingCertifyDocumentsService;
  let globalServiceSpy: SpyObj<GlobalService>;

  beforeEach(() => {
    // https://angular.io/guide/testing#services-with-dependencies
    const spyGlobalService = jasmine.createSpyObj('GlobalService', ['downloadFile']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuditingCertifyDocumentsService,
        { provide: GlobalService, useValue: spyGlobalService }
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(AuditingCertifyDocumentsService);
    globalServiceSpy = TestBed.get(GlobalService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpMock.verify();
  });

  /*** AuditingCertifyDocumentsService method tests begin ***/

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getAuditings()', () => {
    let expectedAuditingCertifyDocs: any;

    beforeEach(() => {
      expectedAuditingCertifyDocs = mockAuditingCertifyDocs;
    });

    it('should return expected Auditing Certify Documents without parameters (called once)', () => {
      service.getAuditings().subscribe(
        response => expect(response).toEqual(expectedAuditingCertifyDocs, 'should return expected Auditing Certify Documents'),
        fail
      );

      // AuditingEventsService should have made one request to GET AuditingCertifyDocs from expected URL

      const req = httpMock.expectOne(request => request.method === 'GET' && request.url === `${service.apiUrl}admin/auditingCertifyDoc`);
      expect(req.request.params.get('page')).toBe('0');
      expect(req.request.params.get('size')).toEqual(BACKEND_PAGINATION_DEFAULT.toString());
      expect(req.request.params.has('sort')).toBeFalsy();

      // Respond with the mock AuditingCertifyDocs
      req.flush(expectedAuditingCertifyDocs);
    });

    it('should return expected Auditing Certify Documents with parameters (called once)', () => {
      service.getAuditings([{text: 'username', value: 'nsousa'}], 1, 10, 'id', SortOrder.DESC).subscribe(
        response => expect(response).toEqual(expectedAuditingCertifyDocs, 'should return expected Auditing Certify Documents'),
        fail
      );

      // LotService should have made one request to GET Auditing Events from expected URL

      const req = httpMock.expectOne(request => request.method === 'GET' && request.url === `${service.apiUrl}admin/auditingCertifyDoc`);
      expect(req.request.params.get('username')).toEqual('nsousa');
      expect(req.request.params.get('page')).toBe('1');
      expect(req.request.params.get('size')).toEqual('10');
      expect(req.request.params.get('sort')).toEqual(`id,${SortOrder.DESC}`);

      // Respond with the mock AuditingCertifyDocs
      req.flush(expectedAuditingCertifyDocs);
    });

    it('should be OK returning no Auditing Certify Documents', () => {
      service.getAuditings().subscribe(
        response => expect(response).toEqual([], 'should return empty Auditing Certify Documents array'),
        fail
      );

      const req = httpMock.expectOne(request => request.method === 'GET' && request.url === `${service.apiUrl}admin/auditingCertifyDoc`);
      expect(req.request.params.get('page')).toBe('0');
      expect(req.request.params.get('size')).toEqual(BACKEND_PAGINATION_DEFAULT.toString());
      expect(req.request.params.has('sort')).toBeFalsy();
      req.flush([]);
    });

  });

  describe('#exportAuditings', () => {

    it('should return the exported audit file', () => {
      const exportAuditFileMock = mockExportAuditFile;
      const startDate: Date = DateUtils.addDays(new Date(), -7);
      const endDate: Date = DateUtils.addDays(new Date(), +8);

      const filters: FilterField[] = [
        { text: 'occurredDate', value: DateUtils.formatDate(startDate) },
        { text: 'occurredDate', value: DateUtils.formatDate(endDate) },
        { text: 'filename', value: 'test.pdf' },
        { text: 'externalApplication.name', value: 'DISP-CLIENT' }
      ];

      service.exportAuditings(filters).subscribe(result => {
        expect(result).toEqual(exportAuditFileMock);
      });

      const req = httpMock.expectOne(request =>
        request.method === 'GET' &&
        request.url === `${service.apiUrl}admin/auditingCertifyDoc/export`);

      req.flush(exportAuditFileMock);
    });

  });

});
