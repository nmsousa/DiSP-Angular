import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditingEventTypesAutocompleteComponent } from './auditing-event-types-autocomplete.component';

xdescribe('AuditingEventTypesAutocompleteComponent', () => {
  let component: AuditingEventTypesAutocompleteComponent;
  let fixture: ComponentFixture<AuditingEventTypesAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditingEventTypesAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditingEventTypesAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
