import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifyDocumentComponent } from './certify-document.component';

xdescribe('CertifyDocumentComponent', () => {
  let component: CertifyDocumentComponent;
  let fixture: ComponentFixture<CertifyDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertifyDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertifyDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
