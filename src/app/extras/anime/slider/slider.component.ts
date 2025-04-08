import { animate, group, query, style, transition, trigger, useAnimation } from '@angular/animations';
import { afterNextRender, Component, Input, signal } from '@angular/core';
import { transform } from 'typescript';
import { slideAnimation } from '../animations/slide.animation';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('slideToggle', [
      transition('* => *', [
        group([
          query(':enter', style({ transform: 'translateX(-100%) scale(.5)' }), { optional: true }),
          query(':leave', [
            animate('750ms ease-in-out', style({ transform: 'translateX(100%) scale(.25)' }))
          ], { optional: true }), // szükséges, mert inicializáláskor még nincs kilépő
          query(':enter', [
            animate('750ms ease-in-out', style({ transform: 'translateX(0) scale(1)' }))
          ], { optional: true })
        ])
      ])
    ]),
    trigger('slideToggleDynamic', [
      transition('* => *', [
        group([
          query(':enter', style({ transform: 'translateX({{enterStart}}) scale(.5)' }), { optional: true }),
          query(':leave', [
            animate('750ms ease-in-out', style({ transform: 'translateX({{leaveEnd}}) scale(.25)' }))
          ], { optional: true }), // szükséges, mert inicializáláskor még nincs kilépő kép
          query(':enter', [
            animate('750ms ease-in-out', style({ transform: 'translateX(0) scale(1)' }))
          ], { optional: true })
        ])
      ], {
        params: {
          leaveEnd: '',
          enterStart: ''
        }
      })
    ]),
    trigger('slideToggleDynamicReuseable', [
      transition('* => *', [
        useAnimation(slideAnimation)
      ])
    ])
  ]
})
export class SliderComponent {
  @Input() tempSwitcher: 'default' | 'params' | 'reuse' | 'disable' = 'default'

  protected selectedImage = signal(1);

  protected animationDirection = signal<'left' | 'right'>('right');

  protected animationDisabled = signal(true);

  constructor() {
    afterNextRender(() => {
      if (this.animationDisabled()) {
        setTimeout(() => {
          this.animationDisabled.set(false);
        }, 0)
      }
    })
  }

  previous() {
    if (this.selectedImage() > 1) {
      this.animationDirection.set('left');
      this.selectedImage.set(this.selectedImage() - 1);
    }
  }

  next() {
    if (this.selectedImage() < 4) {
      this.animationDirection.set('right');
      this.selectedImage.set(this.selectedImage() + 1);
    }
  }
}