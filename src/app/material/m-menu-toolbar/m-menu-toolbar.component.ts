import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatMenu } from '@angular/material/menu';

@Component({
  selector: 'app-m-menu-toolbar',
  templateUrl: './m-menu-toolbar.component.html',
  styleUrls: ['./m-menu-toolbar.component.scss']
})
export class MMenuToolbarComponent {
  form = this._formBuilder.group({
    stateGroup: ['', Validators.required],
  });

  @ViewChild('cpu') cpu!: MatMenu;

  constructor(private _formBuilder: FormBuilder) {

  }
}
