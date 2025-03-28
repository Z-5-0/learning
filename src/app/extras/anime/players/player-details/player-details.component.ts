import { animate, state, style, transition, trigger, AnimationEvent } from '@angular/animations';
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, HostListener, Input, Output, AfterViewInit } from '@angular/core';
import { Player } from '../players';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss'],
  animations: [
    trigger('animation', [
      state('hidden', style({
        opacity: 0,
        transform: 'scale(.25)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      transition('hidden <=> visible', animate('0.15s ease-in-out'))
    ]),
    trigger('overlay', [
      state('hidden', style({ opacity: 0, scale: .8 })),
      state('visible', style({ opacity: 1, scale: 1 })),
      transition('hidden <=> visible', animate('.5s ease-in-out'))
    ])
  ]
})
export class PlayerDetailsComponent {
  @Input({ required: true }) player!: Player;

  @HostBinding('@overlay') animationState = 'hidden';

  @HostListener('@overlay.done', ['$event']) done(event: AnimationEvent) {
    if (event.toState === 'hidden') {
      this.closed.emit();
    }
  }

  @HostListener('@overlay.start', ['$event'])
  onAnimationStart(event: AnimationEvent) {
    // console.log('Animation started!', event);
  }
  @Output() closed = new EventEmitter<void>();

  ngAfterViewInit() {
    this.animationState = 'visible'; // biztosítjuk, hogy az animáció akkor induljon el, amikor a komponens ténylegesen megjelenik
  }

  close() {
    this.animationState = 'hidden';
  }
}
