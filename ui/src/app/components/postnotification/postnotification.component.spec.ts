import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostnotificationComponent } from './postnotification.component';

describe('PostnotificationComponent', () => {
  let component: PostnotificationComponent;
  let fixture: ComponentFixture<PostnotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostnotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostnotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
