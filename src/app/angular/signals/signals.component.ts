import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.scss']
})
export class SignalsComponent implements DoCheck {
  counter: number = 0;
  messages: string[] = [];

  decreaseCounter() {
    this.counter--;
  }

  increaseCounter() {
    this.counter++;
  }

  ngDoCheck(): void {
    this.messages.push('doCheck lifecycle hook');
  }
}
