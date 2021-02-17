import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { mockTemplates } from './../mocks/templates.mock';
import { GlobalService } from './global.service';
import { TemplateAssociationArrays, TemplateService } from './template.service';

import SpyObj = jasmine.SpyObj;

describe('TemplateService', () => {

  let httpMock: HttpTestingController;
  let globalServiceSpy: SpyObj<GlobalService>;
  let service: TemplateService;

  beforeEach(() => {
    // https://angular.io/guide/testing#services-with-dependencies
    const spyGlobalService = jasmine.createSpyObj('GlobalService', ['showMessage']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TemplateService,
        { provide: GlobalService, useValue: spyGlobalService }
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    globalServiceSpy = TestBed.get(GlobalService);
    service = TestBed.get(TemplateService);
  });

  // Making sure that after every test completes there are no more pending requests
  afterEach(() => {
    httpMock.verify();
  });

  /*** TemplateService method tests begin ***/

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getTemplates()', () => {
    let expectedTemplates: any;

    beforeEach(() => {
      // tslint:disable-next-line
      expectedTemplates = mockTemplates;
    });

    it('should return expected Templates', () => {
      service.getTemplates().subscribe(
        response => expect(response).toEqual(expectedTemplates),
        fail
      );

      const req = httpMock.expectOne(request => request.method === 'GET' && request.url === `${service.apiUrl}admin/templates`);

      // Respond with the mock Templates
      // We are deep cloning the array otherwise if service sorts it,
      // we can't really compare with the origin because it will be the same instance
      req.flush(JSON.parse(JSON.stringify(expectedTemplates)));
    });

    it('should be OK returning no Templates', () => {
      service.getTemplates().subscribe(
        response => expect(response).toEqual([]),
        fail
      );

      const req = httpMock.expectOne(request => request.method === 'GET' &&
        request.url === `${service.apiUrl}admin/templates`);

      // Respond with the mock Templates
      req.flush([]);
    });

  });

  describe('#update()', () => {
    let expectedTemplate: any;
    let templateAssociationArrays: TemplateAssociationArrays;

    beforeEach(() => {
      // tslint:disable-next-line
      expectedTemplate = mockTemplates.content[0].content;
      templateAssociationArrays = {
        signatories: [],
        securityAndRoles: [],
        templateUsersAndOwners: []
      }
    });

    it('should be ok updating the Template', () => {
      service.update(expectedTemplate, templateAssociationArrays).subscribe(response => {
        expect(response).toEqual(expectedTemplate);
      });

      const req = httpMock.expectOne(request => request.method === 'PUT' &&
        request.url === `${service.apiUrl}admin/templates/${expectedTemplate.id}`);
      expect(req.request.params.get('filters')).toEqual(null);

      // Respond with the mock Template
      req.flush(expectedTemplate);
    });

    it('should throw the error: \'Template must not be null\'', () => {
      expect(() => service.update(null, templateAssociationArrays)).toThrowError(service.emptyTemplateError);
    });

  });

  describe('#create()', () => {
    let expectedTemplate: any;

    beforeEach(() => {
      // tslint:disable-next-line
      expectedTemplate = mockTemplates.content[0].content;
    });

    it('should be ok creating a new Template', () => {
      service.create(expectedTemplate, null).subscribe(response => {
        expect(response).toEqual(expectedTemplate);
      });

      const req = httpMock.expectOne(request => request.method === 'POST' &&
        request.url === `${service.apiUrl}admin/templates`);
      expect(req.request.params.get('filters')).toEqual(null);

      // Respond with the mock Template
      req.flush(expectedTemplate);
    });

    it('should throw the error: \'Template must not be null\'', () => {
      expect(() => service.create(null, null)).toThrowError(service.emptyTemplateError);
    });

  });

});
