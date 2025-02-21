import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MMenuToolbarComponent } from './m-menu-toolbar.component';

describe('MMenuToolbarComponent', () => {
  let component: MMenuToolbarComponent;
  let fixture: ComponentFixture<MMenuToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MMenuToolbarComponent]
    });
    fixture = TestBed.createComponent(MMenuToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
