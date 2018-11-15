import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantslistComponent } from './applicantslist.component';

describe('ApplicantslistComponent', () => {
  let component: ApplicantslistComponent;
  let fixture: ComponentFixture<ApplicantslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
