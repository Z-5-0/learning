import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfotestComponent } from './infotest.component';

describe('InfotestComponent', () => {
  let component: InfotestComponent;
  let fixture: ComponentFixture<InfotestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfotestComponent]
    });
    fixture = TestBed.createComponent(InfotestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
