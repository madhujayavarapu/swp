import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqcompanieslistComponent } from './reqcompanieslist.component';

describe('ReqcompanieslistComponent', () => {
  let component: ReqcompanieslistComponent;
  let fixture: ComponentFixture<ReqcompanieslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqcompanieslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqcompanieslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
