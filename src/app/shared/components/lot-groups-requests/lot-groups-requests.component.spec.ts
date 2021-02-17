import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotGroupsRequestsComponent } from './lot-groups-requests.component';

xdescribe('LotGroupsRequestsComponent', () => {
  let component: LotGroupsRequestsComponent;
  let fixture: ComponentFixture<LotGroupsRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotGroupsRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotGroupsRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
