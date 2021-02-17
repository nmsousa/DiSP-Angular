import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {SortOrder} from '../../../shared/models/sort-config';
import {BACKEND_PAGINATION_DEFAULT} from '../../../shared/services/base-remote.service';
import {GlobalService} from '../../../shared/services/global.service';
import {DateUtils} from '../../../shared/utils/date.utils';
import {mockAuditingEventTypes} from '../mocks/auditing-event-types.mock';
import {mockAuditingEvents} from '../mocks/auditing-events.mock';
import {mockExportAuditFile} from '../mocks/export-audit-file.mock';

import {AuditingEventsService} from './auditing-events.service';
import SpyObj = jasmine.SpyObj;

describe('AuditingEventsService', () => {

  let httpMock: HttpTestingController;
  let service: AuditingEventsService;
  let globalServiceSpy: SpyObj<GlobalService>;

  beforeEach(() => {
    // https://angular.io/guide/testing#services-with-dependencies
    const spyGlobalService = jasmine.createSpyObj('GlobalService', ['downloadFile']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuditingEventsService,
        { provide: GlobalService, useValue: spyGlobalService }
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(AuditingEventsService);
    globalServiceSpy = TestBed.get(GlobalService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpMock.verify();
  });

  /*** AuditingEventsService method tests begin ***/

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getAuditingEvents()', () => {
    let expectedAuditingEvents: any;

    beforeEach(() => {
      expectedAuditingEvents = mockAuditingEvents;
    });

    it('should return expected Auditing Events without parameters (called once)', () => {
      service.getAuditings().subscribe(
        response => expect(response).toEqual(expectedAuditingEvents, 'should return expected Auditing Events'),
        fail
      );

      // AuditingEventsService should have made one request to POST AuditingEvents from expected URL

      const req = httpMock.expectOne(request => request.method === 'POST' && request.url === `${service.apiUrl}admin/auditingEvents`);
      expect(req.request.params.get('page')).toBe('0');
      expect(req.request.params.get('size')).toEqual(BACKEND_PAGINATION_DEFAULT.toString());
      expect(req.request.params.has('sort')).toBeFalsy();

      // Respond with the mock AuditingEvents
      req.flush(expectedAuditingEvents);
    });

    it('should return expected Auditing Events with parameters (called once)', () => {
      service.getAuditings({username: {id: 'nsousa'}}, 1, 10, 'id', SortOrder.DESC).subscribe(
        response => expect(response).toEqual(expectedAuditingEvents, 'should return expected Auditing Events'),
        fail
      );

      // AuditingEventsService should have made one request to POST Auditing Events from expected URL

      const req = httpMock.expectOne(request => request.method === 'POST' && request.url === `${service.apiUrl}admin/auditingEvents`);
      expect(req.request.body.username).toEqual('nsousa');
      expect(req.request.params.get('page')).toBe('1');
      expect(req.request.params.get('size')).toEqual('10');
      expect(req.request.params.get('sort')).toEqual(`id,${SortOrder.DESC}`);

      // Respond with the mock Auditing Events
      req.flush(expectedAuditingEvents);
    });

    it('should be OK returning no Auditing Events', () => {
      service.getAuditings().subscribe(
        response => expect(response).toEqual({}, 'should return empty Auditing Events array'),
        fail
      );

      const req = httpMock.expectOne(request => request.method === 'POST' && request.url === `${service.apiUrl}admin/auditingEvents`);
      expect(req.request.params.get('page')).toBe('0');
      expect(req.request.params.get('size')).toEqual(BACKEND_PAGINATION_DEFAULT.toString());
      expect(req.request.params.has('sort')).toBeFalsy();
      req.flush({});
    });

  });

  describe('#getAuditingEventTypes()', () => {
    let expectedAuditingEventTypes: any;

    beforeEach(() => {
      expectedAuditingEventTypes = mockAuditingEventTypes;
    });

    it('should return expected Auditing Event Types without parameters (called once)', () => {
      service.getAuditingEventTypes().subscribe(
        response => expect(response).toEqual(expectedAuditingEventTypes, 'should return expected Auditing Event Types'),
        fail
      );

      // AuditingEventsService should have made one request to GET AuditingEventTypes from expected URL

      const req = httpMock.expectOne(request => request.method === 'GET' && request.url === `${service.apiUrl}admin/auditingEventTypes`);
      expect(req.request.params.get('page')).toBe('0');
      expect(req.request.params.get('size')).toEqual(BACKEND_PAGINATION_DEFAULT.toString());

      // Respond with the mock AuditingEventTypes
      req.flush(expectedAuditingEventTypes);
    });

    it('should return expected Auditing Event Types with parameters (called once)', () => {
      service.getAuditingEventTypes([{text: 'type.id', value: 'request'}], 1).subscribe(
        response => expect(response).toEqual(expectedAuditingEventTypes, 'should return expected Auditing Event Types'),
        fail
      );

      // LotService should have made one request to GET Auditing Event Types from expected URL

      const req = httpMock.expectOne(request => request.method === 'GET' && request.url === `${service.apiUrl}admin/auditingEventTypes`);
      expect(req.request.params.get('type.id')).toEqual('request');
      expect(req.request.params.get('page')).toBe('1');
      expect(req.request.params.get('size')).toEqual('10');

      // Respond with the mock Auditing Events
      req.flush(expectedAuditingEventTypes);
    });

    it('should be OK returning no Auditing Event Types', () => {
      service.getAuditingEventTypes().subscribe(
        response => expect(response).toEqual([], 'should return empty Auditing Event Types array'),
        fail
      );

      const req = httpMock.expectOne(request => request.method === 'GET' && request.url === `${service.apiUrl}admin/auditingEventTypes`);
      expect(req.request.params.get('page')).toBe('0');
      expect(req.request.params.get('size')).toEqual(BACKEND_PAGINATION_DEFAULT.toString());
      req.flush([]);
    });

  });

  describe('#exportAuditingEvents', () => {

    it('should return the exported audit file', () => {
      const exportAuditFileMock = mockExportAuditFile;
      const startDate: Date = DateUtils.addDays(new Date(), -7);
      const endDate: Date = DateUtils.addDays(new Date(), +8);
      const formValue: any = {
        occurredDate_From: startDate,
        occurredDate_To: endDate,
        username: {
          id: 'nsousa'
        },
        requestId: 123,
        title: {
          label: null
        },
        type: {
          id: null
        }
      };

      service.exportAuditings(formValue).subscribe(result => {
        expect(result).toEqual(exportAuditFileMock);
      });

      const req = httpMock.expectOne(request =>
        request.method === 'POST' &&
        request.url === `${service.apiUrl}admin/auditingEvents/export`);

      req.flush(exportAuditFileMock);
    });

  });

});
