import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegexComponent } from './regex.component';

const routes: Routes = [
  { path: '', component: RegexComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegexRoutingModule { }
