import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ChildComponent {
  @Input() inputData: {
    id: number,
    label: string,
    type: string,
    details: {
      colors: string[],
      weight: number
    },
    img: string
  } = {
    id: 0,
    label: '',
    type: '',
    details: {
      colors: [],
      weight: 0
    },
    img: 'string'
  };

  @Input() shownData: 'labels' | 'radios' | 'radios2' | 'projectComponent' | 'projectMultiComponent' | 'binding' | 'listener' | 'listener2' = 'labels';

  @Input() typeCount: { all: number, motor: number, car: number } = {all: 0, motor: 0, car: 0};

  selectedRadio: 'all' | 'motor' | 'car' = 'motor';
  @Output() selectedRadioChange: EventEmitter<'all' | 'motor' | 'car'> = new EventEmitter<'all' | 'motor' | 'car'>();

  nameOfProjection: string = 'John Smith';

  @Input() color: string = '';

  textValue: string = 'This is a beautiful day';

  @Output() textInputFocusEvent: EventEmitter<void>  = new EventEmitter<void>;

  onTextInputFocus(event: any) {
    this.textInputFocusEvent.emit();
  }

  @Output() textInputFocusEventFromDirective: EventEmitter<void>  = new EventEmitter<void>;

  onTextInputFocusFromDirective(event: any) {
    this.textInputFocusEventFromDirective.emit();
  }
}
