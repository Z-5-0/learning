import { NgModule } from "@angular/core";
import { AngularplusComponent } from "./angularplus.component";
import { AngularPlusRoutingModule } from "./angularplus-routing.module";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [AngularplusComponent],
    imports: [
        CommonModule,
        AngularPlusRoutingModule
    ],
})

export class AngularPlusModule {

}