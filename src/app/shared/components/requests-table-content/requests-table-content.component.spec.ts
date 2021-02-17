import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsTableContentComponent } from './requests-table-content.component';

xdescribe('RequestsTableContentComponent', () => {
  let component: RequestsTableContentComponent;
  let fixture: ComponentFixture<RequestsTableContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsTableContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsTableContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
