import {Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2} from "@angular/core";

@Directive({
  selector: '[highlight]'
})

export class HighlightDirective {
  @Output() mouseEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private element: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.mouseEvent.emit('in');
    this.renderer.setStyle(this.element.nativeElement, 'transition', '.5s');
    this.renderer.setStyle(this.element.nativeElement, 'color', '#9345e1');
  }

  @HostListener('mouseout') onMouseOut() {
    this.mouseEvent.emit('out');
    this.renderer.setStyle(this.element.nativeElement, 'transition', '.5s');
    this.renderer.setStyle(this.element.nativeElement, 'color', '#B2B1BC');
  }
}
