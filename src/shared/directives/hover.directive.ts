import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from "@angular/core";

@Directive({
  selector: '[hover]'
})

export class HoverDirective {
  @HostBinding('style.color') color: string = '#b2b1bc';
  @HostBinding('style.backgroundColor') backgroundColor: string = '#5c636a';
  @HostBinding('style.border') border: string = '2px dotted #565e64';

  @HostListener('mouseenter') mouseEnter() {
    this.color = '#FF1111';
    this.backgroundColor = '#212121';
    this.border = '2px dotted #FF1111';
  }

  @HostListener('mouseout') mouseOut() {
    this.color = '#b2b1bc';
    this.backgroundColor = '#5c636a';
    this.border = '2px solid #565e64';
  }

  constructor(private element: ElementRef, private renderer: Renderer2) {

  }
}
