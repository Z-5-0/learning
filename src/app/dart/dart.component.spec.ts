import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DartComponent } from './dart.component';

describe('DartComponent', () => {
  let component: DartComponent;
  let fixture: ComponentFixture<DartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DartComponent]
    });
    fixture = TestBed.createComponent(DartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
