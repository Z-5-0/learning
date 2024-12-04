import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotionsComponent } from './notions.component';

describe('NotionsComponent', () => {
  let component: NotionsComponent;
  let fixture: ComponentFixture<NotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
