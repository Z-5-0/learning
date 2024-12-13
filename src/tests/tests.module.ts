import { NgModule } from "@angular/core";
import { HometestComponent } from "./components/hometest/hometest.component";
import { GradePipe } from "src/tests/pipes/grade.pipe";
import { RouterModule, Routes } from "@angular/router";
import { GradeDirective } from "./directives/grade.directive";
import { InfotestComponent } from "./components/infotest/infotest.component";

export const routes: Routes = [
    { path: '', redirectTo: 'hometest', pathMatch: 'full' },
    { path: 'hometest', component: HometestComponent },
    { path: 'infotest', component: InfotestComponent }
];

@NgModule({
    declarations: [
        HometestComponent,
        InfotestComponent,
        GradePipe,
        GradeDirective
    ],
    imports: [
        RouterModule.forChild(routes)
    ]
})

export class TestsModule {

}