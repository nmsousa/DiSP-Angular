import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenHelpModalComponent } from './token-help-modal.component';

xdescribe('TokenHelpModalComponent', () => {
  let component: TokenHelpModalComponent;
  let fixture: ComponentFixture<TokenHelpModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenHelpModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenHelpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
