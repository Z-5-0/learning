import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VscodeComponent } from './vscode.component';

describe('VscodeComponent', () => {
  let component: VscodeComponent;
  let fixture: ComponentFixture<VscodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VscodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VscodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
