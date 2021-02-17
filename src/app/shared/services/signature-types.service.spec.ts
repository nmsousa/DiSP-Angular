import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {mockSignatureTypes} from '../../modules/signature-types/mocks/signature-types.mock';

import {SignatureTypesService} from './signature-types.service';

describe('SignatureTypesService', () => {

  let httpMock: HttpTestingController;
  let service: SignatureTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SignatureTypesService]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(SignatureTypesService);
  });

  // Making sure that after every test completes there are no more pending requests
  afterEach(() => {
    httpMock.verify();
  });

  /*** SignatureTypesService method tests begin ***/

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getUsers()', () => {
    let expectedSignatureTypes: any;

    beforeEach(() => {
      // tslint:disable-next-line
      expectedSignatureTypes = mockSignatureTypes;
    });

    it('should return expected Signature Types', () => {
      service.getAll().subscribe(
        response => expect(response).toEqual(expectedSignatureTypes),
        fail
      );

      const req = httpMock.expectOne(request => request.method === 'GET' && request.url === `${service.apiUrl}admin/signatureTypes`);

      // Respond with the mock Signature Types
      // We are deep cloning the array otherwise if service sorts it,
      // we can't really compare with the origin because it will be the same instance
      req.flush(JSON.parse(JSON.stringify(expectedSignatureTypes)));
    });

    it('should be OK returning no Signature Types', () => {
      service.getAll().subscribe(
        response => expect(response).toEqual([]),
        fail
      );

      const req = httpMock.expectOne(request => request.method === 'GET' &&
        request.url === `${service.apiUrl}admin/signatureTypes`);

      // Respond with the mock Signature Types
      req.flush([]);
    });

  });

  describe('#update()', () => {
    let expectedSignatureType: any;

    beforeEach(() => {
      // tslint:disable-next-line
      expectedSignatureType = mockSignatureTypes.content[0].content;
    });

    it('should return the expected Signature Type', () => {
      service.update(expectedSignatureType).subscribe(response => {
        expect(response).toEqual(expectedSignatureType);
      });

      const req = httpMock.expectOne(request => request.method === 'PUT' &&
        request.url === `${service.apiUrl}admin/signatureTypes/${expectedSignatureType.id}`);
      expect(req.request.params.get('filters')).toEqual(null);

      // Respond with the mock Signature Types
      req.flush(expectedSignatureType);
    });

    it('should throw the error: \'Signature Type must not be null\'', () => {
      expect(() => service.update(null)).toThrowError(service.emptySignatureTypeError);
    });

  });

  describe('#getRecommendedSignatureModeName()', () => {
    let expectedSignatureTypes: any;

    beforeEach(() => {
      // tslint:disable-next-line
      expectedSignatureTypes = mockSignatureTypes;
    });

    it('should return the Signature Mode name from a Signature Type', () => {
      const spyOnGetRecommendedSignatureModeName = spyOn(service, 'getRecommendedSignatureModeName').and.returnValue('MockSignatureName');

      expect(service.getRecommendedSignatureModeName(expectedSignatureTypes.content[0].content)).toEqual('MockSignatureName');
      expect(spyOnGetRecommendedSignatureModeName).toHaveBeenCalled();
    });

    it('should be ok with empty Signature Type', () => {
      expect(service.getRecommendedSignatureModeName(null)).toEqual('');
    });
  });

});
