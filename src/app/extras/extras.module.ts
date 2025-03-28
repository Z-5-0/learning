import { NgModule } from "@angular/core";
import { ExtrasComponent } from "./extras.component";
import { ExtrasRoutingModule } from "./extras-routing.module";
import { CommonModule } from "@angular/common";
import { NgrxComponent } from './ngrx/ngrx.component';
import { AnimeComponent } from './anime/anime.component';
import { ContentComponent } from './anime/content/content.component';
import { MenuComponent } from './anime/menu/menu.component';
import { FormComponent } from './anime/form/form.component';
import { ModalComponent } from './anime/modal/modal.component';
import { PlayersComponent } from "./anime/players/players.component";
import { PlayerDetailsComponent } from './anime/players/player-details/player-details.component';
import { CdkScrollable, OverlayModule } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FilterPlayerPipe } from "./anime/players/filter-player.pipe";
import { SignUpFormComponent } from './anime/sign-up-form/sign-up-form.component';
import { SignUpModalComponent } from './anime/sign-up-modal/sign-up-modal.component';
import { SliderComponent } from './anime/slider/slider.component';
import { NavComponent } from './anime/nav/nav.component';
import { HeaderComponent } from './anime/header/header.component';
import { AnimerouteComponent } from "./anime/animeroute/animeroute.component";
import { HomeComponent } from './anime/animeroute/home/home.component';
import { AnimerouteModule } from "./anime/animeroute/animeroute.module";
import { RouterModule } from "@angular/router";
import { Slider2Component } from './slider2/slider2.component';
import { FlipComponent } from './flip/flip.component';
import { FadeComponent } from './fade/fade.component';

@NgModule({
    declarations: [
        ExtrasComponent,
        NgrxComponent,
        AnimeComponent,
        ContentComponent,
        MenuComponent,
        FormComponent,
        ModalComponent,
        PlayersComponent,
        PlayerDetailsComponent,
        FilterPlayerPipe,
        SignUpFormComponent,
        SignUpModalComponent,
        SliderComponent,
        NavComponent,
        HeaderComponent,
        Slider2Component,
        FlipComponent,
        FadeComponent
    ],
    imports: [
        CommonModule,
        ExtrasRoutingModule,
        OverlayModule,
        FormsModule,
        CdkScrollable,
        ReactiveFormsModule,
        AnimerouteModule
    ],
})

export class ExtrasModule {

}