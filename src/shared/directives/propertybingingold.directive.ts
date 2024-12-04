import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector: '[propertybindingold]'
})

export class PropertybindingoldDirective implements OnInit {
    @Input() background: string = '';
    @Input('propertybindingold') background2: any = 'red';
    @Input() color: string = '';
    @Input() title: string = 'My title';

    constructor(private element: ElementRef, private renderer: Renderer2) {

    }

    ngOnInit(): void {
        this.renderer.setStyle(this.element.nativeElement, 'background', this.background2 || this.background);
        this.renderer.setStyle(this.element.nativeElement, 'color', this.color);
    }
}