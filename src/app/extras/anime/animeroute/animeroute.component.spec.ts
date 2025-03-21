import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimerouteComponent } from './animeroute.component';

describe('AnimerouteComponent', () => {
  let component: AnimerouteComponent;
  let fixture: ComponentFixture<AnimerouteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimerouteComponent]
    });
    fixture = TestBed.createComponent(AnimerouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
