import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRequestGenericContentComponent } from './edit-request-generic-content.component';

xdescribe('EditRequestGenericContentComponent', () => {
  let component: EditRequestGenericContentComponent;
  let fixture: ComponentFixture<EditRequestGenericContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRequestGenericContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRequestGenericContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
