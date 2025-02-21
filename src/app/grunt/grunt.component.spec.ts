import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruntComponent } from './grunt.component';

describe('GruntComponent', () => {
  let component: GruntComponent;
  let fixture: ComponentFixture<GruntComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GruntComponent]
    });
    fixture = TestBed.createComponent(GruntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
