import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureTypesComponent } from './signature-types.component';

xdescribe('SignatureTypesComponent', () => {

  let component: SignatureTypesComponent;
  let fixture: ComponentFixture<SignatureTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignatureTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignatureTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
