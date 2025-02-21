import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAutocompleteComponent } from './m-autocomplete.component';

describe('MAutocompleteComponent', () => {
  let component: MAutocompleteComponent;
  let fixture: ComponentFixture<MAutocompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MAutocompleteComponent]
    });
    fixture = TestBed.createComponent(MAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
