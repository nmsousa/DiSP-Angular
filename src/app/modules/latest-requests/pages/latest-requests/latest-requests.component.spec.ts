import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestRequestsComponent } from './latest-requests.component';

xdescribe('LatestRequestsComponent', () => {
  let component: LatestRequestsComponent;
  let fixture: ComponentFixture<LatestRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
