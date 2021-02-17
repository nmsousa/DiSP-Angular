import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetatypeAutocompleteComponent } from './metatype-autocomplete.component';

xdescribe('MetatypeAutocompleteComponent', () => {
  let component: MetatypeAutocompleteComponent;
  let fixture: ComponentFixture<MetatypeAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetatypeAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetatypeAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
