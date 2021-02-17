import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotAutocompleteComponent } from './lot-autocomplete.component';

xdescribe('LotAutocompleteComponent', () => {
  let component: LotAutocompleteComponent;
  let fixture: ComponentFixture<LotAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
