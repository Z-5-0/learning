import { Component, ElementRef, HostBinding, HostListener, Input, OnChanges, signal, SimpleChanges, ViewChild } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { Player } from './players';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { enterLeaveAnimation } from '../animations/enterleave.animation';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
  animations: [
    trigger('toggle', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        query('.details', [  // child elemet keresünk meg vele
          style({ translate: '0 -100%' })
        ]),
        group([
          animate('250ms ease-in', style({ height: '*', opacity: 1 })),
          query('.details', [  // child elemet keresünk meg vele
            animate('250ms ease-in', style({ translate: '0 0' })),
          ]),
        ]),
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),
        query('.details', [
          style({ translate: '0 0' }),
        ]),
        group([
          animate('250ms ease-out', style({ height: 0, opacity: 0 })),
          query('.details', [
            animate('250ms ease-in', style({ translate: '0 -100%' })),
          ])
        ])
      ])
    ]),
    enterLeaveAnimation
  ]
})
export class PlayersComponent {
  @Input({ required: true }) player!: Player;
  @ViewChild(PlayerDetailsComponent) detailsComponent!: PlayerDetailsComponent;
  protected detailsOpen = false;
  protected scrollStrategy = this.overlay.scrollStrategies.reposition(); // amikor a felhasználó görget, az overlay (például egy lebegő menü, vagy tooltip) újrapozícionálódik

  @Input() tempSwitcher: 'default' | 'expandandcollapse' | 'hostbinding' | 'overlay' = 'default';

  showDetails = signal(false);

  @ViewChild('section') section!: ElementRef;
  @HostBinding('@enterLeaveAnimation') animate = true;

  @HostListener('@enterLeaveAnimation.start', ['$event'])
  onStartAnimation(event: any) {
    this.section.nativeElement.style.backgroundColor = '#392c33';
  };
  @HostListener('@enterLeaveAnimation.done', ['$event'])
  onDoneAnimation(event: any) {
    this.section.nativeElement.style.backgroundColor = '#212121';
  };

  constructor(private overlay: Overlay) { }
}
