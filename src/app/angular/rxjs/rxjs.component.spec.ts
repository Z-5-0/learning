import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularRxjsComponent } from './rxjs.component';

describe('RxjsComponent', () => {
  let component: AngularRxjsComponent;
  let fixture: ComponentFixture<AngularRxjsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularRxjsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularRxjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
