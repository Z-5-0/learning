import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthcontactComponent } from './authcontact.component';

describe('AuthcontactComponent', () => {
  let component: AuthcontactComponent;
  let fixture: ComponentFixture<AuthcontactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthcontactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthcontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
