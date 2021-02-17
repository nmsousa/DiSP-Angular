import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { GlobalService } from 'src/app/shared/services/global.service';

import { UserService } from './user.service';

import SpyObj = jasmine.SpyObj;

describe('UserService', () => {
  let httpMock: HttpTestingController;
  let globalServiceSpy: SpyObj<GlobalService>;

  beforeEach(() => {
    // https://angular.io/guide/testing#services-with-dependencies
    const spyGlobalService = jasmine.createSpyObj('GlobalService', ['showMessage']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        { provide: GlobalService, useValue: spyGlobalService }
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    globalServiceSpy = TestBed.get(GlobalService);
  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
