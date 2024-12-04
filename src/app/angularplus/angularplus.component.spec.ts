import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularplusComponent } from './angularplus.component';

describe('AngularplusComponent', () => {
  let component: AngularplusComponent;
  let fixture: ComponentFixture<AngularplusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularplusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularplusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
