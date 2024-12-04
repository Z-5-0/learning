import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CssscssComponent } from './cssscss.component';

describe('CssscssComponent', () => {
  let component: CssscssComponent;
  let fixture: ComponentFixture<CssscssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CssscssComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CssscssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
