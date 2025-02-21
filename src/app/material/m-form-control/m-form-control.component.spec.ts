import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MFormControlComponent } from './m-form-control.component';

describe('MFormControlComponent', () => {
  let component: MFormControlComponent;
  let fixture: ComponentFixture<MFormControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MFormControlComponent]
    });
    fixture = TestBed.createComponent(MFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
