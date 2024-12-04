import { Directive, ElementRef, Input, Renderer2 } from "@angular/core";

@Directive({
    selector: '[disableElement]'
})

export class DisableElementDirective {
    @Input() set disableElement(disable: boolean) {
        if (disable) {
            this.renderer.setStyle(this.element.nativeElement, 'opacity', '.5');
        } else {
            this.renderer.setStyle(this.element.nativeElement, 'opacity', '1');
        }
    };

    constructor(private element: ElementRef, private renderer: Renderer2) {

    }
}