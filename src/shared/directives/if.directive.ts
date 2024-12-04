import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[if]'
})

export class IfDirective {
    @Input() set if(condition: boolean) {
        if (condition) {
            this.template.createEmbeddedView(this.view); // Metódus, ami elkészíti, és beágyazza a template-be a view-t 
        } else {
            this.template.clear();
        }
    }

    constructor(private view: TemplateRef<any>, private template: ViewContainerRef) {

    }
}