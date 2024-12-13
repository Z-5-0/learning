import { Component, DoCheck, Input, Signal, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.scss']
})
export class SignalsComponent implements DoCheck {
  @Input() tempSwitcher: 'default' | 'numberSignal' | 'arraySignal' | 'computed' = 'default';

  counter: number = 0;
  // counter2: Signal<number> = signal(0); // readonly signal
  counter2 = signal(0);
  counter3 = computed(() => this.counter2() * 2);
  messages: string[] = [];
  messages2 = signal<string[]>([]);

  doubleCounter = computed(() => this.counter2() * 2);

  constructor() {
    const readonlySignal = () => this.counter2(); // egy sima getter funkcióként működik, így az értéke kívülről nem módosítható

    // effect(() => console.log('counter: ' + this.counter2()));
  }

  decreaseCounter() {
    this.counter--;
  }

  decreaseCounter2() {
    // this.counter2.set(1);
    // this.counter2.set(this.counter2() - 1);
    this.counter2.update(val => val - 1);
    // this.messages2.update( (val) => val.push('Decrease')); // nem működik, mert immutable type
    // this.messages2.update(val => [...val, `Decreased: ${this.counter2()}`]); // tud működni update-tel, de nem akarunk új tömböket létrehozni
    this.messages2.mutate(val => val.pop());
  }

  increaseCounter() {
    this.counter++;
  }

  increaseCounter2() {
    // this.counter2.set(1);
    // this.counter2.set(this.counter2() + 1);
    this.counter2.update(val => val + 1);
    // this.messages2.update( (val) => val.push('Increase')); // nem működik, mert immutable type
    // this.messages2.update(val => [...val, `Increased: ${this.counter2()}`]); // tud működni update-tel, de nem akarunk új tömböket létrehozni
    this.messages2.mutate(val => val.push(`Current value is ${this.counter2()}`));
  }

  clearMessage2() {
    this.messages2.mutate(val => []);
  }

  ngDoCheck(): void {
    this.messages.push('doCheck lifecycle hook');
  }
}
