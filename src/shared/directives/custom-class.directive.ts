import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector: '[customClass]'
})

export class CustomClassDirective {
    @Input() set customClass(classes: Object) {
        const classEntries = Object.entries(classes);
        // for (let  i = 0; i < classEntries.length; i++) {...}
        for (let [className, condition] of Object.entries(classes)) {
            // const [className, condition] = i;
            if (condition) {
                this.renderer.addClass(this.element.nativeElement, className);
            }
        };
    };

    constructor(private element: ElementRef, private renderer: Renderer2) {
    }
}