import {Directive, HostBinding, HostListener, Output, EventEmitter} from "@angular/core";

@Directive({
  selector: '[sample]'
})

export class SampleDirective {
  @HostBinding('value') inputValue: string = 'It\s raining over there';

  constructor() {
  }

  @Output() textInputFocusEventOutput: EventEmitter<void>  = new EventEmitter<void>;
  @HostListener('focus') focusEventHappened()  {
    this.textInputFocusEventOutput.emit();
  }
}
