import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveformComponent } from './reactiveform.component';

describe('FormsComponent', () => {
  let component: ReactiveformComponent;
  let fixture: ComponentFixture<ReactiveformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
