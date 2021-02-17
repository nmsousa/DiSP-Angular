import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { forkJoin, Observable } from 'rxjs';

import { mockRequests } from '../mocks/requests.mock';
import { MyDeadlineTypes } from '../models/enums/my-deadline-types.enum';
import { RequestStatuses } from '../models/enums/request-statuses.enum';
import { FilterField } from '../models/filter-field';
import { RequestSelection } from '../models/request-selection';
import { SortOrder } from '../models/sort-config';
import { mockRequest } from './../mocks/request.mock';
import { AuthenticationService } from './authentication.service';
import { BACKEND_PAGINATION_DEFAULT } from './base-remote.service';
import { GlobalService } from './global.service';
import { RequestActions, RequestService } from './request.service';

import SpyObj = jasmine.SpyObj;

describe('RequestService', () => {

  let httpMock: HttpTestingController;
  let service: RequestService;
  let authenticationServiceSpy: SpyObj<AuthenticationService>;
  let globalServiceSpy: SpyObj<GlobalService>;

  beforeEach(() => {
    // https://angular.io/guide/testing#services-with-dependencies
    const spyGlobalService = jasmine.createSpyObj('GlobalService', ['downloadFile', 'downloadZipFile', 'showMessage']);
    const spyAuthenticationService = jasmine.createSpyObj('AuthenticationService', ['getUsername', 'getFullname']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RequestService,
        { provide: GlobalService, useValue: spyGlobalService },
        { provide: AuthenticationService, useValue: spyAuthenticationService }]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(RequestService);
    authenticationServiceSpy = TestBed.get(AuthenticationService);
    globalServiceSpy = TestBed.get(GlobalService);
  });

  // Making sure that after every test completes there are no more pending requests
  afterEach(() => {
    httpMock.verify();
  });

  /*** RequestService method tests begin ***/

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getRequests()', () => {
    let expectedRequests: any;

    beforeEach(() => {
      // tslint:disable-next-line
      expectedRequests = mockRequests;
    });

    it('should return expected Requests without parameters', () => {
      service.getRequests().subscribe(
        response => expect(response).toEqual(expectedRequests),
        fail
      );

      const req = httpMock.expectOne(request => request.method === 'GET' && request.url === `${service.apiUrl}admin/requests`);
      expect(req.request.params.get('signatureType.isProtected')).toEqual('0');
      expect(req.request.params.has('filters')).toBeFalsy();
      expect(req.request.params.get('page')).toBe('0');
      expect(req.request.params.get('size')).toEqual(BACKEND_PAGINATION_DEFAULT.toString());
      expect(req.request.params.has('sort')).toBeFalsy();

      // Respond with the mock Requests
      req.flush(expectedRequests);
    });

    describe('should return expected Requests with parameters', () => {

      it('should return with parameter status=COMPLETED', () => {
        const filters: any = [{text: 'status', value: RequestStatuses.COMPLETED}];

        service.getRequests(filters).subscribe(
          response => expect(response).toEqual(expectedRequests),
          fail
        );

        const req = httpMock.expectOne(request => request.method === 'GET' && request.url === `${service.apiUrl}admin/requests`);
        expect(req.request.params.get('signatureType.isProtected')).toEqual('0');
        expect(req.request.params.get('status')).toEqual(RequestStatuses.COMPLETED);
        expect(req.request.params.get('page')).toBe('0');
        expect(req.request.params.get('size')).toEqual(BACKEND_PAGINATION_DEFAULT.toString());
        expect(req.request.params.has('sort')).toBeFalsy();

        // Respond with the mock Requests
        req.flush(expectedRequests);
      });

      it('should return with parameter page=3', () => {
        const pageIndex: number = 3;

        service.getRequests([], pageIndex).subscribe(
          response => expect(response).toEqual(expectedRequests),
          fail
        );

        const req = httpMock.expectOne(request => request.method === 'GET' && request.url === `${service.apiUrl}admin/requests`);
        expect(req.request.params.get('signatureType.isProtected')).toEqual('0');
        expect(req.request.params.get('page')).toBe(pageIndex.toString());
        expect(req.request.params.get('size')).toEqual(BACKEND_PAGINATION_DEFAULT.toString());
        expect(req.request.params.has('sort')).toBeFalsy();

        // Respond with the mock Requests
        req.flush(expectedRequests);
      });

      it('should return with parameter size=25', () => {
        const pageSize: number = 25;

        service.getRequests([], 0, pageSize).subscribe(
          response => expect(response).toEqual(expectedRequests),
          fail
        );

        const req = httpMock.expectOne(request => request.method === 'GET' && request.url === `${service.apiUrl}admin/requests`);
        expect(req.request.params.get('signatureType.isProtected')).toEqual('0');
        expect(req.request.params.get('page')).toBe('0');
        expect(req.request.params.get('size')).toEqual(pageSize.toString());
        expect(req.request.params.has('sort')).toBeFalsy();

        // Respond with the mock Requests
        req.flush(expectedRequests);
      });

      it('should return with parameter sort=id,DESC', () => {
        const sortField: string = 'id';
        const sortOrder: SortOrder = SortOrder.DESC;

        service.getRequests([], 0, BACKEND_PAGINATION_DEFAULT, sortField, sortOrder).subscribe(
          response => expect(response).toEqual(expectedRequests),
          fail
        );

        const req = httpMock.expectOne(request => request.method === 'GET' && request.url === `${service.apiUrl}admin/requests`);
        expect(req.request.params.get('signatureType.isProtected')).toEqual('0');
        expect(req.request.params.get('page')).toBe('0');
        expect(req.request.params.get('size')).toEqual(BACKEND_PAGINATION_DEFAULT.toString());
        expect(req.request.params.get('sort')).toEqual(`${sortField},${sortOrder}`);

        // Respond with the mock Requests
        req.flush(expectedRequests);
      });

      it('should return with parameters: status=COMPLETED&page=3&size=25&sort=id,DESC', () => {
        const filters: any = [{text: 'status', value: RequestStatuses.COMPLETED}];
        const pageIndex: number = 3;
        const pageSize: number = 25;
        const sortField: string = 'id';
        const sortOrder: SortOrder = SortOrder.DESC;

        service.getRequests(filters, pageIndex, pageSize, sortField, sortOrder).subscribe(
          response => expect(response).toEqual(expectedRequests),
          fail
        );

        const req = httpMock.expectOne(request => request.method === 'GET' && request.url === `${service.apiUrl}admin/requests`);
        expect(req.request.params.get('signatureType.isProtected')).toEqual('0');
        expect(req.request.params.get('status')).toEqual(RequestStatuses.COMPLETED);
        expect(req.request.params.get('page')).toBe(pageIndex.toString());
        expect(req.request.params.get('size')).toEqual(pageSize.toString());
        expect(req.request.params.get('sort')).toEqual(`${sortField},${sortOrder}`);

        // Respond with the mock Requests
        req.flush(expectedRequests);
      });

    });

    it('should return expected Requests without parameters', () => {
      service.getRequests().subscribe(
        response => expect(response).toEqual(expectedRequests),
        fail
      );

      const req = httpMock.expectOne(request => request.method === 'GET' && request.url === `${service.apiUrl}admin/requests`);
      expect(req.request.params.get('signatureType.isProtected')).toEqual('0');
      expect(req.request.params.has('filters')).toBeFalsy();
      expect(req.request.params.get('page')).toBe('0');
      expect(req.request.params.get('size')).toEqual(BACKEND_PAGINATION_DEFAULT.toString());
      expect(req.request.params.has('sort')).toBeFalsy();

      // Respond with the mock Requests
      req.flush(expectedRequests);
    });

    it('should be OK returning empty', () => {
      const filters: any = [{text: 'id', value: '-1'}];

      service.getRequests(filters).subscribe(
        response => expect(response).toEqual([]),
        fail
      );

      const req = httpMock.expectOne(request => request.method === 'GET' && request.url === `${service.apiUrl}admin/requests`);
      expect(req.request.params.get('signatureType.isProtected')).toEqual('0');
      expect(req.request.params.get('id')).toEqual('-1');
      expect(req.request.params.get('page')).toBe('0');
      expect(req.request.params.get('size')).toEqual(BACKEND_PAGINATION_DEFAULT.toString());
      expect(req.request.params.has('sort')).toBeFalsy();

      // Respond with the empty Requests
      req.flush([]);
    });

  });

  describe('#getRequest()', () => {
    let expectedRequest: any;

    beforeEach(() => {
      // tslint:disable-next-line
      expectedRequest = mockRequest;
    });

    it('should throw the error: \'Request Id must not be null\'', () => {
      expect(() => service.getRequest()).toThrowError(service.emptyRequestIdError);
    });

    it('should return with parameter: id=23545', () => {
      const requestId: number = 23545;
      service.getRequest(requestId).subscribe(
        response => expect(response).toEqual(expectedRequest),
        fail
      );

      const req = httpMock.expectOne(request =>
        request.method === 'GET' &&
        request.url === `${service.apiUrl}admin/requests/${requestId}`);

      // Respond with the mock Request
      req.flush(expectedRequest);
    });

  });

  describe('#updateRequestsStatus()', () => {

    it('should return an Observable array with a SINGLE URL to update the Request status to CANCELED', () => {
      const requestIds: string[] = ['1000'];
      const newStatus: RequestStatuses = RequestStatuses.CANCELED;
      const observablesList: Array<Observable<any>> = service.updateRequestsStatus(requestIds, newStatus);

      forkJoin(observablesList).subscribe(response => {
        expect(response).toEqual(requestIds);
      });

      expect(observablesList.length).toBe(1);

      const req = httpMock.expectOne(request =>
        request.method === 'POST' &&
        request.url === `${service.apiUrl}requests/${requestIds[0]}/status` &&
        request.body === `\"${newStatus}\"`);

      // Respond with the empty Requests
      req.flush(requestIds[0]);
    });

    it('should return an Observable array with MULTIPLE URLs to Update each Request status to CANCELED', () => {
      const requestIds: string[] = ['1000', '1020'];
      const newStatus: RequestStatuses = RequestStatuses.CANCELED;
      const observablesList: Array<Observable<any>> = service.updateRequestsStatus(requestIds, newStatus);

      forkJoin(observablesList).subscribe(response => {
        expect(response).toEqual(requestIds);
      });

      expect(observablesList.length).toBe(requestIds.length);

      for (let i = 0; i < observablesList.length; i++) {
        const req = httpMock.expectOne(request =>
          request.method === 'POST' &&
          request.url === `${service.apiUrl}requests/${requestIds[i]}/status` &&
          request.body === `\"${newStatus}\"`);

        // Respond with the empty Requests
        req.flush(requestIds[i]);
      }
    });

    it('should throw the error: \'Request Id must not be null\'', () => {
      expect(() => service.updateRequestsStatus(null, RequestStatuses.CANCELED)).toThrowError(service.emptyRequestIdError);
    });

  });

  describe('#archiveRequests()', () => {
    const mockUsername: string = 'Administrator';

    beforeEach(() => {
      // Mock AuthenticationService.getUsername()
      authenticationServiceSpy.getUsername.and.returnValue(mockUsername);
    });

    it('should return an Observable array with a SINGLE URL to Archive a Request', () => {
      const requestIds: string[] = ['1000'];
      const observablesList: Array<Observable<any>> = service.archiveRequests(requestIds);

      forkJoin(observablesList).subscribe(response => {
        expect(response).toEqual(requestIds);
      });

      expect(observablesList.length).toBe(1);

      const req = httpMock.expectOne(request =>
        request.method === 'DELETE' &&
        request.url === `${service.apiUrl}admin/requests/${requestIds[0]}` &&
        (request.body && request.body.username === mockUsername));

      // Respond with the empty Requests
      req.flush(requestIds[0]);
    });

    it('should return an Observable array with MULTIPLE URLs to Archive each Request', () => {
      const requestIds: string[] = ['1000', '1020'];
      const observablesList: Array<Observable<any>> = service.archiveRequests(requestIds);

      forkJoin(observablesList).subscribe(response => {
        expect(response).toEqual(requestIds);
      });

      expect(observablesList.length).toBe(requestIds.length);

      for (let i = 0; i < observablesList.length; i++) {
        const req = httpMock.expectOne(request =>
          request.method === 'DELETE' &&
          request.url === `${service.apiUrl}admin/requests/${requestIds[i]}` &&
          (request.body && request.body.username === mockUsername));

        // Respond with the empty Requests
        req.flush(requestIds[i]);
      }
    });

    it('should throw the error: \'Request Id must not be null\'', () => {
      expect(() => service.archiveRequests(null)).toThrowError(service.emptyRequestIdError);
    });

  });

  describe('#purgeRequests()', () => {
    const mockUsername: string = 'Administrator';
    const mockComment: string = 'This is the comment about Purging this Request.';

    beforeEach(() => {
      // Mock AuthenticationService.getUsername()
      authenticationServiceSpy.getUsername.and.returnValue(mockUsername);
    });

    it('should return an Observable array with a SINGLE URL to Purge a Request', () => {
      const requestIds: string[] = ['1000'];
      const observablesList: Array<Observable<any>> = service.purgeRequests(requestIds, mockComment);

      forkJoin(observablesList).subscribe(response => {
        expect(response).toEqual(requestIds);
      });

      expect(observablesList.length).toBe(1);

      const req = httpMock.expectOne(request =>
        request.method === 'DELETE' &&
        request.url === `${service.apiUrl}admin/requests/${requestIds[0]}/purge` &&
        (request.body && request.body.username === mockUsername && request.body.comment === mockComment));

      // Respond with the empty Requests
      req.flush(requestIds[0]);
    });

    it('should return an Observable array with MULTIPLE URLs to Purge each Request', () => {
      const requestIds: string[] = ['1000', '1020'];
      const observablesList: Array<Observable<any>> = service.purgeRequests(requestIds, mockComment);

      forkJoin(observablesList).subscribe(response => {
        expect(response).toEqual(requestIds);
      });

      expect(observablesList.length).toBe(requestIds.length);

      for (let i = 0; i < observablesList.length; i++) {
        const req = httpMock.expectOne(request =>
          request.method === 'DELETE' &&
          request.url === `${service.apiUrl}admin/requests/${requestIds[i]}/purge` &&
          (request.body && request.body.username === mockUsername && request.body.comment === mockComment));

        // Respond with the empty Requests
        req.flush(requestIds[i]);
      }
    });

    it('should throw the error: \'Request Id must not be null\'', () => {
      expect(() => service.purgeRequests(null)).toThrowError(service.emptyRequestIdError);
    });

  });

  describe('#downloadRequestFile()', () => {

    it('should return the request file', () => {
      const requestId: string = '1000';

      service.downloadRequestFile(requestId).subscribe(response => {
        expect(response).toEqual({});
      });

      const req = httpMock.expectOne(request =>
        request.method === 'GET' &&
        request.url === `${service.apiUrl}requests/${requestId}/document`);

      req.flush({});
    });

    it('should throw the error: \'Request Id must not be null\'', () => {
      expect(() => service.downloadRequestFile(null)).toThrowError(service.emptyRequestIdError);
    });

  });

  describe('#downloadRequestsFile()', () => {

    it('should return the requests files', () => {
      const requestIds: string[] = ['1000', '1020'];
      const observablesList: Array<Observable<any>> = service.downloadRequestsFile(requestIds);

      forkJoin(observablesList).subscribe(response => {
        expect(response).toEqual(requestIds);
      });

      expect(observablesList.length).toBe(requestIds.length);

      for (let i = 0; i < observablesList.length; i++) {
        const req = httpMock.expectOne(request =>
          request.method === 'GET' &&
          request.url === `${service.apiUrl}requests/${requestIds[i]}/document`);

        // Respond with the empty Requests
        req.flush(requestIds[i]);
      }
    });

    it('should throw the error: \'Request Id must not be null\'', () => {
      expect(() => service.downloadRequestsFile(null)).toThrowError(service.emptyRequestIdError);
    });

  });

  describe('#downloadZipFile()', () => {
    const mockFullname: string = 'John Doe';

    beforeEach(() => {
      // Mock AuthenticationService.getUsername()
      authenticationServiceSpy.getFullname.and.returnValue(mockFullname);
    });

    it('should be OK with empty parameters', () => {
      service.downloadZipFile([]);

      expect(globalServiceSpy.downloadZipFile).toHaveBeenCalled();
    });

  });

  describe('#filterByDeadlineInterval()', () => {

    it('should return an array with the deadline filter - PLUSMINUSWEEK', () => {
      checkForTwoDeadlineDates(service.filterByDeadlineInterval(MyDeadlineTypes.PLUSMINUSWEEK));
    });

    it('should return an array with the deadline filter - PAST', () => {
      checkForTwoDeadlineDates(service.filterByDeadlineInterval(MyDeadlineTypes.PAST));
    });

    it('should return an array with the deadline filter - FUTURE', () => {
      checkForTwoDeadlineDates(service.filterByDeadlineInterval(MyDeadlineTypes.FUTURE));
    });

    it('should return an empty array for the deadline filter - ALL', () => {
      expect(service.filterByDeadlineInterval(MyDeadlineTypes.ALL).length).toBe(0);
    });

    // Function to avoid repeating the same logic for each type of deadline filter
    function checkForTwoDeadlineDates(filters: FilterField[]) {
      expect(filters.length).toBe(2);
      expect(filters[0].text).toBe('deadline');
      expect(filters[1].text).toBe('deadline');
      expect(filters[1].value).toBeGreaterThan(filters[0].value);
    }

  });

  describe('#isRequestSelectionValid()', () => {
    let requestSelection: RequestSelection;
    let requestsMock: any;

    beforeEach(() => {
      requestSelection = { requests: [], ids : [] };
      // Clone of the Requests, so we don't edit it's reference instance and influence the other tests
      requestsMock = JSON.parse(JSON.stringify(mockRequests.content));
    });

    it('should return FALSE for empty requests, independently of the status', () => {
      expect(service.isRequestSelectionValid(RequestActions.SEND, requestSelection)).toBeFalsy();
      expect(service.isRequestSelectionValid(RequestActions.CANCEL, requestSelection)).toBeFalsy();
      expect(service.isRequestSelectionValid(RequestActions.ARCHIVE, requestSelection)).toBeFalsy();
      expect(service.isRequestSelectionValid(RequestActions.PURGE, requestSelection)).toBeFalsy();
    });

    // Only status DRAFT is permitted
    describe('Action = SEND', () => {
      it('should return TRUE when ALL Request.status=DRAFT', () => {
        // Changing the status of all requests to DRAFT
        requestSelection.requests = requestsMock.map(request => {
          request.content.status = RequestStatuses.DRAFT;
          return request.content;
        });

        expect(service.isRequestSelectionValid(RequestActions.SEND, requestSelection)).toBeTruthy();
      });

      it('should return FALSE when AT LEAST ONE Request.status<>DRAFT', () => {
        requestSelection.requests = requestsMock.map(req => req.content);
        requestSelection.requests[0].status = RequestStatuses.CANCELED;
        expect(service.isRequestSelectionValid(RequestActions.SEND, requestSelection)).toBeFalsy();
      });

    });

    // Only status DRAFT, SENT or ONGOING are permitted
    describe('Action = CANCEL', () => {
      it('should return TRUE when ALL Request.status=DRAFT || Request.status=SENT || Request.status=ONGOING', () => {
        // Changing the status of the requests to DRAFT or SENT or ONGOING according to their id
        requestSelection.requests = requestsMock.map(req => {
          if (req.content.id % 3 === 0) {
            req.content.status = RequestStatuses.DRAFT;
          } else if (req.content.id % 2 === 0) {
            req.content.status = RequestStatuses.SENT;
          } else {
            req.content.status = RequestStatuses.ONGOING;
          }

          return req.content;
        });

        expect(service.isRequestSelectionValid(RequestActions.CANCEL, requestSelection)).toBeTruthy();
      });

      it('should return FALSE when AT LEAST ONE Request.status<>DRAFT && Request.status<>SENT && Request.status<>ONGOING', () => {
        requestSelection.requests = requestsMock.map(req => req.content);
        requestSelection.requests[0].status = RequestStatuses.CANCELED;
        expect(service.isRequestSelectionValid(RequestActions.CANCEL, requestSelection)).toBeFalsy();
      });

    });

    // Only status CANCELED or COMPLETED are permitted and NON ARCHIVED requests
    describe('Action = ARCHIVE', () => {
      it('should return TRUE when ALL (Request.status=CANCELED || Request.status=COMPLETED) && Request.archive=FALSE', () => {
        // Changing the status of the requests to CANCELED or COMPLETED according to their id
        requestSelection.requests = requestsMock.map(req => {
          req.content.archive = false;
          if (req.content.id % 2 === 0) {
            req.content.status = RequestStatuses.CANCELED;
          } else {
            req.content.status = RequestStatuses.COMPLETED;
          }

          return req.content;
        });

        expect(service.isRequestSelectionValid(RequestActions.ARCHIVE, requestSelection)).toBeTruthy();
      });

      it('should return FALSE when AT LEAST ONE Request.status<>CANCELED && Request.status<>COMPLETED', () => {
        requestSelection.requests = requestsMock.map(req => req.content);
        requestSelection.requests[0].status = RequestStatuses.SENT;
        expect(service.isRequestSelectionValid(RequestActions.ARCHIVE, requestSelection)).toBeFalsy();
      });

      it('should return FALSE when AT LEAST ONE Request.archive=TRUE', () => {
        requestSelection.requests = requestsMock.map(req => req.content);
        requestSelection.requests[0].archive = true;
        expect(service.isRequestSelectionValid(RequestActions.ARCHIVE, requestSelection)).toBeFalsy();
      });
    });

    // Only status CANCELED or COMPLETED are permitted
    describe('Action = PURGE', () => {
      it('should return TRUE when ALL Request.status=CANCELED || Request.status=COMPLETED', () => {
        // Changing the status of the requests to CANCELED or COMPLETED according to their id
        requestSelection.requests = requestsMock.map(req => {
          if (req.content.id % 2 === 0) {
            req.content.status = RequestStatuses.CANCELED;
          } else {
            req.content.status = RequestStatuses.COMPLETED;
          }

          return req.content;
        });

        expect(service.isRequestSelectionValid(RequestActions.PURGE, requestSelection)).toBeTruthy();
      });

      it('should return FALSE when AT LEAST ONE Request.status<>CANCELED && Request.status<>COMPLETED', () => {
        requestSelection.requests = requestsMock.map(req => req.content);
        requestSelection.requests[0].status = RequestStatuses.SENT;
        expect(service.isRequestSelectionValid(RequestActions.PURGE, requestSelection)).toBeFalsy();
      });
    });

  });

});
