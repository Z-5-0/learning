import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector: '[customStyle]'
})

export class CustomStyleDirective {
    @Input('customStyle') set style(styles: Object) {
        for (let [property, value] of Object.entries(styles)) {
            this.renderer.setStyle(this.element.nativeElement, property, value);
        }
    };

    constructor(private element: ElementRef, private renderer: Renderer2) {
    }
}