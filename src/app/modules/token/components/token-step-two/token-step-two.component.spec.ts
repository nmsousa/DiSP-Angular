import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenStepTwoComponent } from './token-step-two.component';

xdescribe('TokenStepTwoComponent', () => {
  let component: TokenStepTwoComponent;
  let fixture: ComponentFixture<TokenStepTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenStepTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
