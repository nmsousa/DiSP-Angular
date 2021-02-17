import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditingEventsComponent } from './auditing-events.component';

xdescribe('AuditingEventsComponent', () => {
  let component: AuditingEventsComponent;
  let fixture: ComponentFixture<AuditingEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditingEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditingEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
