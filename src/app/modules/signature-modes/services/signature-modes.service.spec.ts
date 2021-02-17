import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {mockSignatureModes} from '../mocks/signature-modes.mock';

import {SignatureModesService} from './signature-modes.service';

describe('SignatureModesService', () => {

  let httpMock: HttpTestingController;
  let service: SignatureModesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [SignatureModesService]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(SignatureModesService);
  });

  // Making sure that after every test completes there are no more pending requests
  afterEach(() => {
    httpMock.verify();
  });

  /*** SignatureModesService method tests begin ***/

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getUsers()', () => {
    let expectedSignatureModes: any;

    beforeEach(() => {
      // tslint:disable-next-line
      expectedSignatureModes = mockSignatureModes;
    });

    it('should return expected Signature Modes', () => {
      service.getAll().subscribe(
        response => {
          // Sort the mock Array by name ASC and expect that the returning Array from the service is also sorted the same way
          const sortedExpectedSignatureModes: any[] =
            expectedSignatureModes.content ? expectedSignatureModes.content.sort((a, b) => (a.content.name > b.content.name) ? 1 : -1) : [];
          expect(response).toEqual(sortedExpectedSignatureModes);
        },
        fail
      );

      const req = httpMock.expectOne(request => request.method === 'GET' && request.url === `${service.apiUrl}admin/signatureModes`);

      // Respond with the mock Signature Modes
      // We are deep cloning the array otherwise if service sorts it,
      // we can't really compare with the origin because it will be the same instance
      req.flush(JSON.parse(JSON.stringify(expectedSignatureModes)));
    });

    it('should be OK returning no Signature Modes', () => {
      service.getAll().subscribe(
        response => expect(response).toEqual([]),
        fail
      );

      const req = httpMock.expectOne(request => request.method === 'GET' && request.url === `${service.apiUrl}admin/signatureModes`);

      // Respond with the mock Signature Modes
      req.flush([]);
    });

  });

});
