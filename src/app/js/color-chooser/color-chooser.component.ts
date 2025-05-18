import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-color-chooser',
  templateUrl: './color-chooser.component.html',
  styleUrls: ['./color-chooser.component.scss']
})
export class ColorChooserComponent {
  // @Output() newColorSelected: EventEmitter<string> = new EventEmitter<string>;
  @Output() newColorSelected = new EventEmitter();

  constructor() {
  }

  formSubmit(e: any) {
    e.preventDefault();
    console.log(e.target.elements.color.value);
    const newColor = e.target.elements.color.value;
    console.log(newColor);
    this.newColorSelected.emit(newColor);
  }
}
