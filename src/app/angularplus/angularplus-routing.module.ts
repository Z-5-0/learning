import { NgModule } from "@angular/core";
import { NoPreloading, Route, RouterModule } from "@angular/router";
import { AngularplusComponent } from "./angularplus.component";

const routes: Route[] = [
    { path: '', component: AngularplusComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AngularPlusRoutingModule {

}