import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {mockUser, mockUsers} from '../mocks/user.mock';
import {BACKEND_PAGINATION_DEFAULT} from './base-remote.service';

import {AuthenticationService} from './authentication.service';

describe('AuthenticationService', () => {

  let httpMock: HttpTestingController;
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(AuthenticationService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpMock.verify();
  });

  /*** AuthenticationService method tests begin ***/

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getAuthenticatedUser()', () => {
    let expectedUser: any;

    beforeEach(() => {
      service = TestBed.get(AuthenticationService);
      // tslint:disable-next-line
      expectedUser = mockUser;
    });

    it('should return expected User (called once)', () => {
      service.getAuthenticatedUser().subscribe(
        response => expect(response).toEqual(expectedUser, 'should return expected user'),
        fail
      );

      // AuthenticationService should have made one request to GET user from expected URL
      const req = httpMock.expectOne(`${service.apiUrl}admin/users/session`);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock user
      req.flush(expectedUser);
    });

    it('should be OK returning no User', () => {
      service.getAuthenticatedUser().subscribe(
        response => expect(response).toEqual({ links: [], content: undefined }, 'should not return an user'),
        fail
      );

      const req = httpMock.expectOne(`${service.apiUrl}admin/users/session`);
      req.flush({ links: [], content: undefined });
    });

  });

  describe('#getUsers()', () => {
    let expectedUsers: any;

    beforeEach(() => {
      expectedUsers = mockUsers;
    });

    it('should return expected Users without parameters (called once)', () => {
      service.getUsers().subscribe(
        response => expect(response).toEqual(expectedUsers, 'should return expected users'),
        fail
      );

      // AuthenticationService should have made one request to GET the Users from expected URL

      const req = httpMock.expectOne(request => request.method === 'GET' && request.url === `${service.apiUrl}admin/users`);
      expect(req.request.params.get('page')).toBe('0');
      expect(req.request.params.get('size')).toEqual(BACKEND_PAGINATION_DEFAULT.toString());
      expect(req.request.params.get('isActive')).toEqual('1');

      // Respond with the mock Users
      req.flush(expectedUsers);
    });

    it('should return expected Users with parameters (called once)', () => {
      const nameMock: string = 'nun';

      service.getUsers([{text: 'firstname', value: nameMock}], 1, BACKEND_PAGINATION_DEFAULT).subscribe(
        response => expect(response).toEqual(expectedUsers, 'should return expected users'),
        fail
      );

      // AuthenticationService should have made one request to GET Users from expected URL

      const req = httpMock.expectOne(request => request.method === 'GET' && request.url === `${service.apiUrl}admin/users`);

      // Check that all the users from the result contain the text 'nun' in the firstname or in the lastname
      let firstOrLastnameContainsText: boolean;
      expectedUsers.content.forEach(user => {
        firstOrLastnameContainsText = user.content.firstname.toLowerCase().includes(nameMock.toLowerCase()) ||
          user.content.lastname.toLowerCase().includes(nameMock.toLowerCase());

        expect(firstOrLastnameContainsText).toBeTruthy();
      });

      expect(req.request.params.get('firstname')).toEqual(nameMock);
      expect(req.request.params.get('page')).toBe('1');
      expect(req.request.params.get('size')).toEqual(BACKEND_PAGINATION_DEFAULT.toString());

      // Respond with the mock Users
      req.flush(expectedUsers);
    });

  });

});
