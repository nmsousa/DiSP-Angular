import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import { GlobalService } from 'src/app/shared/services/global.service';
import {LotService} from '../../shared/services/lot.service';
import {HeaderHandlerInterceptor} from './header-handler.interceptor';
import SpyObj = jasmine.SpyObj;

describe('HeaderHandlerInterceptor', () => {

  let httpMock: HttpTestingController;
  let service: LotService;
  let interceptor: HeaderHandlerInterceptor;
  let globalServiceSpy: SpyObj<GlobalService>;

  beforeEach(() => {
    // https://angular.io/guide/testing#services-with-dependencies
    const spyGlobalService = jasmine.createSpyObj('GlobalService', ['showMessage']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeaderHandlerInterceptor,
        LotService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HeaderHandlerInterceptor,
          multi: true,
        },
        { provide: GlobalService, useValue: spyGlobalService },
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(LotService);
    interceptor = TestBed.get(HeaderHandlerInterceptor);
    globalServiceSpy = TestBed.get(GlobalService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpMock.verify();
  });

  /*** HeaderHandlerInterceptor method tests begin ***/

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  describe('#intercept()', () => {
    it('should add the header params: api-authorization and Content-Type=application/json', () => {

      // This could have been any request, just to test headers
      service.getLots().subscribe(res => {
        expect(res).toBeTruthy();
      });

      const req = httpMock.expectOne(request => request.method === 'GET' && request.url === `${service.apiUrl}admin/lots`);
      expect(req.request.headers.get('api-authorization')).not.toEqual(null);
      expect(req.request.headers.get('Content-Type')).toEqual('application/json');

      // Respond with the mock Signature Types
      req.flush({});
    });
  });

});
