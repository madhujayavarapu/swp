import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HireempComponent } from './hireemp.component';

describe('HireempComponent', () => {
  let component: HireempComponent;
  let fixture: ComponentFixture<HireempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HireempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HireempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
