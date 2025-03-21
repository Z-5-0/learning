import { animate, group, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { players } from './players/players';

const hidden = { transform: 'translateX(100%)' };
const visible = { transform: 'translateX(0)' };
const timing = '500ms ease-in'

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.scss'],
  animations: [
    trigger('openClose', [
      state('closed', style({ transform: 'translateX(100%)' })),
      state('open', style({ transform: 'translateX(0)' })),
      transition('closed <=> open', [animate('500ms ease-in')])
    ]),
    trigger('enterLeaveOpenClose', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('500ms ease-in', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)' }),
        animate('500ms ease-in', style({ transform: 'translateX(100%)' }))
      ]),
    ]),
    trigger('enterLeaveOpenClose2', [
      transition(':enter', [
        style(hidden),
        animate(timing, style(visible))
      ]),
      transition(':leave', [
        style(visible),
        animate(timing, style(hidden))
      ]),
    ]),
    trigger('keyframe', [
      transition(':enter',
        animate('1s', keyframes([
          style({ transform: 'translateX(100%) scale(.5)', offset: 0 }),
          style({ transform: 'translateX(-100%) scale(.5)', offset: .2 }), // a teljes animációs idő (1mp) 20%-ánál már ebben az állapotban van
          style({ transform: 'translateX(-100%) scale(.75) rotate(360deg)', offset: .9 }), // a teljes animációs idő (1mp) 75%-ánál már ebben az állapotban van
          style({ transform: 'translateX(0) scale(1) rotate(360deg)', offset: 1 }),
        ]
        ))),
      transition(':leave', animate('1s', keyframes([
        style({ transform: 'translateX(0) scale(1) rotate(360deg)', offset: 0 }),
        style({ transform: 'translateX(-100%) scale(.75) rotate(360deg)', offset: .2 }),
        style({ transform: 'translateX(-100%) scale(.5)', offset: .9 }),
        style({ transform: 'translateX(100%) scale(.5)', offset: 1 }),
      ]))),
    ]),
    trigger('querystagger', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'scale(0.7)' }),
          stagger(100, [
            animate('200ms ease-in', style({ opacity: 1, transform: 'scale(1)' }))
          ])
        ], { optional: true }),
        query(':leave', [
          style({ opacity: 1, transform: 'scale(1)' }),
          stagger(-100, [
            animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.7)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('grouping', [
      transition('* <=> *', [
        group([
          query(':enter', [
            style({ opacity: 0, transform: 'scale(0.7)' }),
            stagger(100, [
              animate('500ms ease-in', style({ opacity: 1, transform: 'scale(1)' }))
            ])
          ], { optional: true }),
          query(':enter', [
            style({ backgroundColor: 'rgba(0, 255, 0, .2)' }),
            animate('1000ms ease-in', style({ backgroundColor: '#212121' }))
          ], { optional: true }),
          query(':enter h2, :enter button', [
            style({ color: 'rgba(0, 255, 0, .7)' }),
            animate('1000ms ease-in', style({ color: 'rgb(178, 177, 188)' }))
          ], { optional: true }),
        ]),
        group([
          query(':leave', [
            style({ opacity: 1, transform: 'scale(1)' }),
            stagger(-100, [
              animate('500ms ease-in', style({ opacity: 0, transform: 'scale(0.7)' }))
            ])
          ], { optional: true }),
          query(':leave', [
            animate('250ms ease-in', style({ backgroundColor: 'rgba(255, 0, 0, .2)' })) // nincs style, csak "átanimáljuk" piros színre
          ], { optional: true }),
          query(':leave h2, :leave button', [
            animate('250ms ease-in', style({ color: 'rgba(255, 0, 0, .7)' })) // nincs style, csak "átanimáljuk" piros színre
          ], { optional: true }),
        ])
      ])
    ])
  ]
})
export class AnimeComponent {
  @Input() tempSwitcher: 'default' | 'enterleave' | 'keyframe' | 'querystagger' | 'signupform' | 'multianime' | 'height' = 'default';

  protected menuState: 'open' | 'closed' = 'closed';

  protected menuOpen: boolean = false;

  protected players = [players[0]];
  protected totalCount = players.length;

  protected addPlayers() {
    const allPlayers = players.slice(1);
    this.players = [...this.players, ...allPlayers];
  }

  protected removePlayers() {
    this.players = [this.players[0]];
  }
}
