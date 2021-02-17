import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateThirdPartyComponent } from './template-third-party.component';

xdescribe('TemplateThirdPartyComponent', () => {
  let component: TemplateThirdPartyComponent;
  let fixture: ComponentFixture<TemplateThirdPartyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateThirdPartyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateThirdPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
