import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatedrivenformComponent } from './templatedrivenform.component';

describe('TemplatedrivenformsComponent', () => {
  let component: TemplatedrivenformComponent;
  let fixture: ComponentFixture<TemplatedrivenformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplatedrivenformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplatedrivenformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
