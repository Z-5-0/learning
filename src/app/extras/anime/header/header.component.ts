import { animate, transition, trigger, useAnimation } from '@angular/animations';
import { Component, signal } from '@angular/core';
import { slideAnimation } from '../animations/slide.animation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('slideToggleDynamicReuseable', [
      transition('* => *', [
        useAnimation(slideAnimation)
      ])
    ])
  ]
})
export class HeaderComponent {
  protected showMenu = signal(false);
}
