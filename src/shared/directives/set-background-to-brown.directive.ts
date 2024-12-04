import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[setBackgroundToBrown]'
})
export class SetBackgroundToBrownDirective implements OnInit {
  @Input() setColorToo: boolean = false;
  @Input() setTitle: boolean = false;
  @Input() setCustomClass: boolean = false;

  // elementRef!: ElementRef;

  private renderer!: Renderer2;

  constructor(private element: ElementRef, renderer: Renderer2) {
    renderer.setStyle(element.nativeElement, 'backgroundColor', '#6e3208');
    // element.nativeElement.style.backgroundColor = '#6e3208';
    this.renderer = renderer;
  }

  ngOnInit() {
    if (this.setColorToo) {
      // this.element.nativeElement.style.color = '#c3e8e2';
      this.renderer.setStyle(this.element.nativeElement, 'color', '#c3e8e2');
    }

    if (this.setTitle) {
      this.renderer.setAttribute(this.element.nativeElement, 'title', 'Title is set');
    }

    if (this.setCustomClass) {
      this.renderer.addClass(this.element.nativeElement, 'custom-class');
    }
  }
}
