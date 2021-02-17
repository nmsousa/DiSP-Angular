import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaFormActionsComponent } from './criteria-form-actions.component';

xdescribe('CriteriaFormActionsComponent', () => {
  let component: CriteriaFormActionsComponent;
  let fixture: ComponentFixture<CriteriaFormActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriteriaFormActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaFormActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
