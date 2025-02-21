import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MBadgeComponent } from './m-badge.component';

describe('MBadgeComponent', () => {
  let component: MBadgeComponent;
  let fixture: ComponentFixture<MBadgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MBadgeComponent]
    });
    fixture = TestBed.createComponent(MBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
