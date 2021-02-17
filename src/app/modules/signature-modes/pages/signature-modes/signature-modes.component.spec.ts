import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureModesComponent } from './signature-modes.component';

xdescribe('SignatureModesComponent', () => {
  let component: SignatureModesComponent;
  let fixture: ComponentFixture<SignatureModesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignatureModesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignatureModesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
