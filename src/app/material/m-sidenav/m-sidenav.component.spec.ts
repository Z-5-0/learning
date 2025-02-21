import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MSidenavComponent } from './m-sidenav.component';

describe('MSidenavComponent', () => {
  let component: MSidenavComponent;
  let fixture: ComponentFixture<MSidenavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MSidenavComponent]
    });
    fixture = TestBed.createComponent(MSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
