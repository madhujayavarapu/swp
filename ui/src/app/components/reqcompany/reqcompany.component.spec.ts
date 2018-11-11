import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqcompanyComponent } from './reqcompany.component';

describe('ReqcompanyComponent', () => {
  let component: ReqcompanyComponent;
  let fixture: ComponentFixture<ReqcompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqcompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqcompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
