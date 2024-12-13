import { Component, inject } from '@angular/core';
import { ActionService } from 'src/shared/services/action.service';

@Component({
  selector: 'app-standalone',
  templateUrl: './standalone.component.html',
  styleUrls: ['./standalone.component.scss']
})
export class StandaloneComponent {
  action: string = 'Done';
  actionService: ActionService = inject(ActionService);

  changeAction() {
    this.action = this.actionService.changeAction();
  }
}
