import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureTypeInfoComponent } from './signature-type-info.component';

xdescribe('SignatureTypeInfoComponent', () => {
  let component: SignatureTypeInfoComponent;
  let fixture: ComponentFixture<SignatureTypeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignatureTypeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignatureTypeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
