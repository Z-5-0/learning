import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MPopupComponent } from './m-popup.component';

describe('MPopupComponent', () => {
  let component: MPopupComponent;
  let fixture: ComponentFixture<MPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MPopupComponent]
    });
    fixture = TestBed.createComponent(MPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
