import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAutocompleteComponent } from './users-autocomplete.component';

xdescribe('UsersAutocompleteComponent', () => {
  let component: UsersAutocompleteComponent;
  let fixture: ComponentFixture<UsersAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
