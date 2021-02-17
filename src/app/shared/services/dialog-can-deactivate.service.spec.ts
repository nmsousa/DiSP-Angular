import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { DialogCanDeactivateService } from './dialog-can-deactivate.service';
import { GlobalService } from './global.service';

import SpyObj = jasmine.SpyObj;

describe('DialogCanDeactivateService', () => {
  let httpMock: HttpTestingController;
  let globalServiceSpy: SpyObj<GlobalService>;

  beforeEach(() => {
    // https://angular.io/guide/testing#services-with-dependencies
    const spyGlobalService = jasmine.createSpyObj('GlobalService', ['showMessage']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DialogCanDeactivateService,
        { provide: GlobalService, useValue: spyGlobalService }
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    globalServiceSpy = TestBed.get(GlobalService);
  });

  it('should be created', () => {
    const service: DialogCanDeactivateService = TestBed.get(DialogCanDeactivateService);
    expect(service).toBeTruthy();
  });
});
