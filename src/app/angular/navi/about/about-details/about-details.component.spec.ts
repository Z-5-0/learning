import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDetailsComponent } from './about-details.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AboutDetailsService } from 'src/shared/services/about-details.service';

describe('AboutDetailsComponent', () => {
  let component: AboutDetailsComponent;
  let fixture: ComponentFixture<AboutDetailsComponent>;

  // Mock ActivatedRoute
  const activatedRouteMock = {
    paramMap: of({
      get: (key: string) => '1', // Mock paramMap get metódust
    })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: AboutDetailsService, useValue: { aboutDetailsArray: [] } } // Mock AboutDetailsService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
