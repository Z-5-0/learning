import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
    selector: '[appGrade]'
})

export class GradeDirective {
    @Input() mark: number = 0;

    @HostListener('mouseenter') onMouseEnter() {
        if (this.mark >= 90) {
            this.el.nativeElement.style.color = 'green';
        } else if (this.mark < 90 && this.mark >= 35) {
            this.el.nativeElement.style.color = 'yellow';
        } else if (this.mark < 35) {
            this.el.nativeElement.style.color = 'red';
        }
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.el.nativeElement.style.color = 'black';
    }

    constructor(private el: ElementRef) {

    }
}