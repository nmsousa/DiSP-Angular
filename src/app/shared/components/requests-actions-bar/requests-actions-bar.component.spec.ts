import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsActionsBarComponent } from './requests-actions-bar.component';

xdescribe('RequestsActionsBarComponent', () => {
  let component: RequestsActionsBarComponent;
  let fixture: ComponentFixture<RequestsActionsBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsActionsBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsActionsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
