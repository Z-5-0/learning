import { NgModule } from "@angular/core";
import { ExtrasComponent } from "./extras.component";
import { ExtrasRoutingModule } from "./extras-routing.module";
import { CommonModule } from "@angular/common";
import { NgrxComponent } from './ngrx/ngrx.component';

@NgModule({
    declarations: [ExtrasComponent, NgrxComponent],
    imports: [
        CommonModule,
        ExtrasRoutingModule
    ],
})

export class ExtrasModule {

}