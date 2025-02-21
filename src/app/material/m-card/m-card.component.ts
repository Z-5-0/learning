import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-m-card',
  templateUrl: './m-card.component.html',
  styleUrls: ['./m-card.component.scss']
})
export class MCardComponent {
  form = this._formBuilder.group({
    stateGroup: ['', Validators.required],
  });

  cardImgSize: string = 'small';

  constructor(private _formBuilder: FormBuilder) {

  }
}
