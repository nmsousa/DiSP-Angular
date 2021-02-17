import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotRequestsTableComponent } from './lot-requests-table.component';

xdescribe('LotRequestsTableComponent', () => {
  let component: LotRequestsTableComponent;
  let fixture: ComponentFixture<LotRequestsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotRequestsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotRequestsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
