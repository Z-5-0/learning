import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // alapértelmezett útvonal, így egyből be is tölt
  { path: 'animehome', component: HomeComponent },
  { path: 'animeabout', component: AboutComponent },
  { path: 'animecontact', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimerouteRoutingModule { }
