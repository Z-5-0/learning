import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegexComponent } from './regex.component';

describe('RegexComponent', () => {
  let component: RegexComponent;
  let fixture: ComponentFixture<RegexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegexComponent]
    });
    fixture = TestBed.createComponent(RegexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
