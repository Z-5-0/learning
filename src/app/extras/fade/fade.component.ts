import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

const fakeFade = trigger('fakeFade', [
  transition('1 <=> 2', [
    query('.active', [
      style({ opacity: 0, scale: .7 }),
    ]),
    query(':not(.active)', [
      animate('500ms ease-out', style({ opacity: 0, scale: .7 }))
    ]),
    query('.active', [
      animate('500ms ease-in', style({ opacity: 1, scale: 1 }))
    ])
  ])
]);

const trueFade = trigger('trueFade', [
  transition('1 <=> 2', [
    group([ // szimultán mód futtatja a query-ket, enélkül nem igazi a fade effektus
      query('.active', [
        style({ opacity: 0, scale: .7 }),
      ]),
      query(':not(.active)', [
        animate('500ms ease-out', style({ opacity: 0, scale: .7 }))
      ]),
      query('.active', [
        animate('500ms ease-in', style({ opacity: 1, scale: 1 }))
      ])
    ])
  ])
]);

@Component({
  selector: 'app-fade',
  templateUrl: './fade.component.html',
  styleUrls: ['./fade.component.scss'],
  animations: [fakeFade, trueFade]
})
export class FadeComponent {
  protected step: 1 | 2 = 1;

  protected fadeType: 'fakeFade' | 'trueFade' = 'fakeFade';
}
