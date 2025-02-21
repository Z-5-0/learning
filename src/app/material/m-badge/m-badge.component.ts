import { Component, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatBadge } from '@angular/material/badge';

@Component({
  selector: 'app-m-badge',
  templateUrl: './m-badge.component.html',
  styleUrls: ['./m-badge.component.scss']
})
export class MBadgeComponent {
  form = this._formBuilder.group({
    stateGroup: ['', Validators.required],
  });

  showBadge: boolean = true;

  hidden = {
    first: false,
    second: false,
    fourth: false
  };

  constructor(private _formBuilder: FormBuilder) {
  }
}
