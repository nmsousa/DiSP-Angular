import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditingCertifyDocumentsComponent } from './auditing-certify-documents.component';

xdescribe('AuditingCertifyDocumentsComponent', () => {
  let component: AuditingCertifyDocumentsComponent;
  let fixture: ComponentFixture<AuditingCertifyDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditingCertifyDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditingCertifyDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
