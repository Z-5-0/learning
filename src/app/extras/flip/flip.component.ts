import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, signal } from '@angular/core';
import { transform } from 'typescript';

@Component({
  selector: 'app-flip',
  templateUrl: './flip.component.html',
  styleUrls: ['./flip.component.scss'],
  animations: [
    trigger('flip', [
      state('false', style({ transform: 'none' })),
      state('true', style({ transform: '{{transformData}}' }), { params: { transformData: 'rotateY(180deg)' } }), // a param adja meg a default értéket
      transition('true <=> false', [animate('1s ease-in-out')])
    ])
  ]
})
export class FlipComponent {
  protected flipped = signal({ status: false, rotate: 'rotateY(180deg)', direction: '' });
}
