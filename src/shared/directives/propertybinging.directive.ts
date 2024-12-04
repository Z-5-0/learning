import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector: '[propertybinding]'
})

export class PropertybindingDirective implements OnInit {
    @Input('propertybinding') changeAllProp!: {background: string, color: string};

    constructor(private element: ElementRef, private renderer: Renderer2) {
    }

    ngOnInit(): void {
        this.renderer.setStyle(this.element.nativeElement, 'background', this.changeAllProp.background);
        this.renderer.setStyle(this.element.nativeElement, 'color', this.changeAllProp.color);
    }
}