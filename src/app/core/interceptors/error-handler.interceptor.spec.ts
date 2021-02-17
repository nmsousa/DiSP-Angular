import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {GlobalService} from '../../shared/services/global.service';
import {LotService} from '../../shared/services/lot.service';
import {ErrorHandlerInterceptor, ErrorInterceptorSkipHeader} from './error-handler.interceptor';
import SpyObj = jasmine.SpyObj;

describe('ErrorHandlerInterceptor', () => {

  let httpMock: HttpTestingController;
  let service: LotService;
  let interceptor: ErrorHandlerInterceptor;
  let globalServiceSpy: SpyObj<GlobalService>;

  beforeEach(() => {
    // https://angular.io/guide/testing#services-with-dependencies
    const spyGlobalService = jasmine.createSpyObj('GlobalService', ['showMessage']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ErrorHandlerInterceptor,
        LotService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorHandlerInterceptor,
          multi: true,
        },
        { provide: GlobalService, useValue: spyGlobalService },
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(LotService);
    interceptor = TestBed.get(ErrorHandlerInterceptor);
    globalServiceSpy = TestBed.get(GlobalService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpMock.verify();
  });

  /*** ErrorHandlerInterceptor method tests begin ***/

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  describe('#intercept()', () => {
    it('should remove, if present, the header param: \'X-Skip-Error-Interceptor\'', () => {

      // This could have been any request, just to test headers
      service.getLots().subscribe(res => {
        expect(res).toEqual({});
      });

      const req = httpMock.expectOne(request => request.method === 'GET' && request.url === `${service.apiUrl}admin/lots`);
      expect(req.request.headers.has(ErrorInterceptorSkipHeader)).toBeFalsy();

      // Respond with the mock Signature Types
      req.flush({});
    });
  });

});
