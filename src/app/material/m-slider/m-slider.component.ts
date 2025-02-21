import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-m-slider',
  templateUrl: './m-slider.component.html',
  styleUrls: ['./m-slider.component.scss']
})
export class MSliderComponent {
  form = this._formBuilder.group({
    value: new FormControl(),
    min: new FormControl(),
    max: new FormControl(),
    step: new FormControl(),
    ticks: new FormControl(),
    label: new FormControl(),
    disabled: new FormControl(),
  });

  disabled = false;
  max = 100;
  min = 0;
  showTicks = true;
  step = 10;
  thumbLabel = false;
  value = 30;

  constructor(private _formBuilder: FormBuilder) {

  }
}
