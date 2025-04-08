import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegexRoutingModule } from './regex-routing.module';
import { RegexComponent } from './regex.component';


@NgModule({
  declarations: [
    RegexComponent
  ],
  imports: [
    CommonModule,
    RegexRoutingModule
  ]
})
export class RegexModule { }
