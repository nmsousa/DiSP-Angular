import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { mockLots } from '../mocks/lots.mock';
import { SortOrder } from '../models/sort-config';
import { BACKEND_PAGINATION_DEFAULT } from './base-remote.service';
import { LotService } from './lot.service';

describe('LotService', () => {

  let httpMock: HttpTestingController;
  let service: LotService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LotService]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(LotService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpMock.verify();
  });

  /*** LotService method tests begin ***/

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getLots()', () => {
    let expectedLots: any;

    beforeEach(() => {
      expectedLots = mockLots;
    });

    it('should return expected Lots without parameters (called once)', () => {
      service.getLots().subscribe(
        response => expect(response).toEqual(expectedLots, 'should return expected lots'),
        fail
      );

      // LotService should have made one request to GET lots from expected URL

      const req = httpMock.expectOne(request => request.method === 'GET' && request.url === `${service.apiUrl}admin/lots`);
      expect(req.request.params.get('page')).toBe('0');
      expect(req.request.params.get('size')).toEqual(BACKEND_PAGINATION_DEFAULT.toString());
      expect(req.request.params.has('sort')).toBeFalsy();

      // Respond with the mock Lot
      req.flush(expectedLots);
    });

    it('should return expected Lots with parameters (called once)', () => {
      service.getLots([{text: 'lotName', value: 'PORTAL'}], 1, 10, 'id', SortOrder.DESC).subscribe(
        response => expect(response).toEqual(expectedLots, 'should return expected lots'),
        fail
      );

      // LotService should have made one request to GET lots from expected URL

      const req = httpMock.expectOne(request => request.method === 'GET' && request.url === `${service.apiUrl}admin/lots`);
      expect(req.request.params.get('lotName')).toEqual('PORTAL');
      expect(req.request.params.get('page')).toBe('1');
      expect(req.request.params.get('size')).toEqual('10');
      expect(req.request.params.get('sort')).toEqual(`id,${SortOrder.DESC}`);

      // Respond with the mock lots
      req.flush(expectedLots);
    });

    it('should be OK returning no Lots', () => {
      service.getLots().subscribe(
        response => expect(response).toEqual([], 'should return empty lots array'),
        fail
      );

      const req = httpMock.expectOne(request => request.method === 'GET' && request.url === `${service.apiUrl}admin/lots`);
      expect(req.request.params.get('page')).toBe('0');
      expect(req.request.params.get('size')).toEqual(BACKEND_PAGINATION_DEFAULT.toString());
      expect(req.request.params.has('sort')).toBeFalsy();
      req.flush([]);
    });

  });

});
