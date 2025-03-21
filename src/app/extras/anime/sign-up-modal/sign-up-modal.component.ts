import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.scss']
})
export class SignUpModalComponent {
  @Input() tempSwitcher: 'default' | 'height' = 'default';
  @Output() modalClose = new EventEmitter<void>();
}
