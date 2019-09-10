import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAddOnComponent } from './service-add-on.component';

describe('ServiceAddOnComponent', () => {
  let component: ServiceAddOnComponent;
  let fixture: ComponentFixture<ServiceAddOnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceAddOnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceAddOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
