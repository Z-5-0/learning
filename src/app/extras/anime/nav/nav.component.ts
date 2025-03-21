import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  items = [
    'Home',
    'About',
    'Blog',
    'Support'
  ];
}
