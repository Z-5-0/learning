import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GulpComponent } from './gulp.component';

describe('GulpComponent', () => {
  let component: GulpComponent;
  let fixture: ComponentFixture<GulpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GulpComponent]
    });
    fixture = TestBed.createComponent(GulpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
