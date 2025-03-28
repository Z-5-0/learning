import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimerouteRoutingModule } from './animeroute-routing.module';
import { AnimerouteComponent } from './animeroute.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    AnimerouteComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    AnimerouteRoutingModule,
  ],
  exports: [
    AnimerouteComponent
  ]
})
export class AnimerouteModule { }
