import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnittestComponent } from './unittest.component';

describe('UnittestComponent', () => {
  let component: UnittestComponent;
  let fixture: ComponentFixture<UnittestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnittestComponent]
    });
    fixture = TestBed.createComponent(UnittestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
