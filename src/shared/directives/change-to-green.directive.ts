import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[changeToGreen]'
})
export class ChangeToGreenDirective implements OnInit {
  @Input() set changeToGreen(condition: boolean) {
    condition ? this.setColor('#1aff00') : this.setColor('#bfff00');
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.setColor('#bfff00');
  }

  setColor(color: string) {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      "color",
      color
    );
  }
}
