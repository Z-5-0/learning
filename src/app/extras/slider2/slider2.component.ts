import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-slider2',
  templateUrl: './slider2.component.html',
  styleUrls: ['./slider2.component.scss'],
  animations: [
    trigger('slide', [
      // state('false', style({ translate: '-300%' })), // balra animálás
      // state('true', style({ translate: '0' })),
      // state('false', style({ translate: '0' })), // jobbra animálás
      // state('true', style({ translate: '300%' })),
      // state('false', style({ translate: '0 -300%' })), // felfelé animálás
      // state('true', style({ translate: '0' })),
      state('false', style({ translate: '0 300%' })), // lefelé animálás
      state('true', style({ translate: '0' })),
      transition('false <=> true', animate('1s ease-in-out'))
    ])
  ]
})
export class Slider2Component {
  protected visible = signal(false);
}
