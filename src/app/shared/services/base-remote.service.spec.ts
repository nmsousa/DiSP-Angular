import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

import {BaseRemoteService} from './base-remote.service';

describe('BaseRemoteService', () => {

  let httpMock: HttpTestingController;
  let service: BaseRemoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BaseRemoteService]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(BaseRemoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
