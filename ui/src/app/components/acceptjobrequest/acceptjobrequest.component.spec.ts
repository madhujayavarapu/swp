import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptjobrequestComponent } from './acceptjobrequest.component';

describe('AcceptjobrequestComponent', () => {
  let component: AcceptjobrequestComponent;
  let fixture: ComponentFixture<AcceptjobrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptjobrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptjobrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
