import { NgModule } from "@angular/core";
import { NoPreloading, Route, RouterModule } from "@angular/router";
import { ExtrasComponent } from "./extras.component";

const routes: Route[] = [
    { path: '', component: ExtrasComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ExtrasRoutingModule {

}