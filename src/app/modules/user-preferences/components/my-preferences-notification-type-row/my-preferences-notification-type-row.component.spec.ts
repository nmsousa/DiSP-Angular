import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPreferencesNotificationTypeRowComponent } from './my-preferences-notification-type-row.component';

xdescribe('MyPreferencesNotificationTypeRowComponent', () => {
  let component: MyPreferencesNotificationTypeRowComponent;
  let fixture: ComponentFixture<MyPreferencesNotificationTypeRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPreferencesNotificationTypeRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPreferencesNotificationTypeRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
