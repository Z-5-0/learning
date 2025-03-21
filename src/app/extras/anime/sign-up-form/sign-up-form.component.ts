import { animate, keyframes, style, transition, trigger, AnimationEvent, query, group } from '@angular/animations';
import { Component, EventEmitter, Input, Output, Renderer2, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { startWith } from 'rxjs';
import { transform } from 'typescript';

interface SignUpForm {
  email: FormControl<string>;
  password: FormControl<string>
  confirmPassword: FormControl<string>;
}

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
  animations: [
    trigger('wobble', [
      transition('false => true', [
        animate('1s', keyframes([
          style({ transform: 'translateX(-10px)', offset: 0.1 }),
          style({ transform: 'translateX(10px)', offset: 0.3 }),
          style({ transform: 'translateX(-10px)', offset: 0.5 }),
          style({ transform: 'translateX(5px)', offset: 0.7 }),
          style({ transform: 'translateX(5px)', offset: 0.8 }),
          style({ transform: 'translateX(0)', offset: 1 })
        ]))
      ])
    ]),
    trigger('paneChange', [
      transition('* => *', [
        query(':self', [
          style({ height: '{{startHeight}}px' }) // ezzel az értékkel indulunk, hogy ne változzon azonnal a méret
        ]),
        query(':enter', [ // belépő panel kezdeti állapota
          style({ opacity: 0, scale: 0.9 })
        ]),
        query(':leave', [ // a kilépő panel animálása
          style({ opacity: 1, scale: 1 }),
          animate('1s ease-in', style({ opacity: 0, scale: 0.9 }))
        ], { optional: true }),
        group([ 
          query(':self', [  // a :self a triggerelő elemet célozza
            animate('1s ease-in', style({ height: '*' }))
          ]),
          query(':enter', [
            animate('1s ease-in', style({ opacity: 1, scale: 1 }))
          ]),
        ], { params: { startHeight: 0 } })
      ])
    ])
  ]
})
export class SignUpFormComponent {
  @Output() formSubmitted = new EventEmitter<void>();
  protected form = new FormGroup<SignUpForm>({
    email: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    password: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    confirmPassword: new FormControl<string>('', { nonNullable: true, validators: Validators.required })
  });

  protected wobbleField = false;

  @Input() tempSwitcher: 'default' | 'height' = 'default';

  constructor(private renderer: Renderer2) { }

  protected onWobbleStart(event: AnimationEvent) {
    if (event.fromState !== 'void') { // inicializálást követően void lesz a fromState
      // this.renderer.addClass(event.element, 'invalid');
      this.renderer.setStyle(event.element, 'color', 'red');
      this.renderer.setStyle(event.element.lastElementChild, 'box-shadow', '0px 0px 10px 1px rgba(157,38,38,0.75)');
    }
  }

  protected activePane = signal(0);

  setActiveStep() {
    this.activePane.set(this.activePane() === 0 ? 1 : 0);
  }
}
