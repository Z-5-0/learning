import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  @Output() menuClick = new EventEmitter<void>();

  @Input() tempSwitcher: 'default' | 'modal' | 'height' = 'default';

  protected signUpModalOpen = (this.tempSwitcher === 'modal') ? true : false;
}
