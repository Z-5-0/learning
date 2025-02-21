import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Movie } from '../m-dialog.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-m-popup',
  templateUrl: './m-popup.component.html',
  styleUrls: ['./m-popup.component.scss']
})
export class MPopupComponent implements OnInit {
  userForm = this._formBuilder.group({
    position: this._formBuilder.control('', Validators.required),
    title: this._formBuilder.control('', Validators.required),
    year: this._formBuilder.control('', Validators.required),
    genre: this._formBuilder.control('', Validators.required),
    rating: this._formBuilder.control('', Validators.required),
    plot: this._formBuilder.control('', Validators.required)
  });

  constructor(
    public dialogRef: MatDialogRef<MPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { label: string, row: Movie },
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // console.log(this.data);
  }

  onSubmit(event: any) {
    event.preventDefault();
    if (!this.userForm.valid) {
      return;
    }
    this.dialogRef.close({ ...this.data, row: this.userForm.value }); // data: {new: boolean, label: 'string, row}
    // a [mat-dialog-close]="data" ugyanezt adja át az afterClosed függvénynek
  }
}
