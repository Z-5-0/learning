import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-page-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Output() close = new EventEmitter<void>();
  protected items = [
    'Shoes',
    'Clothing',
    'Accessories',
    'Sale',
    'Gift guide',
    'Customs',
    'Skateboarding',
    'More'
  ];
}
