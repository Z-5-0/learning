import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-m-sidenav',
  templateUrl: './m-sidenav.component.html',
  styleUrls: ['./m-sidenav.component.scss']
})
export class MSidenavComponent {
  form = this._formBuilder.group({
    stateGroup: ['', Validators.required],
  });

  showExtraMenu: boolean = false;

  constructor(private _formBuilder: FormBuilder) {

  }
}
