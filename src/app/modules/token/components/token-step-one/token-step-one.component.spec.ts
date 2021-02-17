import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenStepOneComponent } from './token-step-one.component';

xdescribe('TokenStepOneComponent', () => {
  let component: TokenStepOneComponent;
  let fixture: ComponentFixture<TokenStepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenStepOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
