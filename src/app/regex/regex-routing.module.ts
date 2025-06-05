import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegexComponent } from './regex.component';
import { YouCantActivate } from 'src/shared/guards/fourofour.guard';

const routes: Routes = [
  { path: '', component: RegexComponent, canActivate: [YouCantActivate] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegexRoutingModule { }
