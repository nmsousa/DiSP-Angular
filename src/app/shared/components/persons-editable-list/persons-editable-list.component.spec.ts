import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsEditableListComponent } from './persons-editable-list.component';

xdescribe('PersonsEditableListComponent', () => {
  let component: PersonsEditableListComponent;
  let fixture: ComponentFixture<PersonsEditableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonsEditableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsEditableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
