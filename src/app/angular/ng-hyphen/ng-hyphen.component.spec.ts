import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgHyphenComponent } from './ng-hyphen.component';

describe('NgHyphenComponent', () => {
  let component: NgHyphenComponent;
  let fixture: ComponentFixture<NgHyphenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgHyphenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgHyphenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
