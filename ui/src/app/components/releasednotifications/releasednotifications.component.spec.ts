import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasednotificationsComponent } from './releasednotifications.component';

describe('ReleasednotificationsComponent', () => {
  let component: ReleasednotificationsComponent;
  let fixture: ComponentFixture<ReleasednotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleasednotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleasednotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
