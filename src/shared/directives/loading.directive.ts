import { Directive, ElementRef, Input, Renderer2, OnChanges } from '@angular/core';

@Directive({
    selector: '[loading]'
})
export class LoadingDirective implements OnChanges {
    @Input('loading') isLoading: boolean = false;

    private spinnerContainer: HTMLDivElement;
    private spinner: HTMLDivElement;

    constructor(private el: ElementRef, private renderer: Renderer2) {
        this.spinnerContainer = this.renderer.createElement('div');
        this.renderer.setStyle(this.spinnerContainer, 'position', 'absolute');
        this.renderer.setStyle(this.spinnerContainer, 'top', '50%');
        this.renderer.setStyle(this.spinnerContainer, 'left', '50%');
        this.renderer.setStyle(this.spinnerContainer, 'transform', 'translate(-50%, -50%)');
        this.renderer.setStyle(this.spinnerContainer, 'z-index', '999');

        this.spinner = this.renderer.createElement('div');
        this.renderer.addClass(this.spinner, 'spinner-border');
        this.spinner = this.spinnerContainer.appendChild(this.spinner);
    }

    ngOnChanges(): void {
        if (this.isLoading) {
            this.showSpinner();
        } else {
            this.hideSpinner();
        }
    }

    private showSpinner(): void {
        this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
        this.renderer.appendChild(this.el.nativeElement, this.spinnerContainer);
    }

    private hideSpinner(): void {
        this.renderer.removeChild(this.el.nativeElement, this.spinnerContainer);
    }
}
