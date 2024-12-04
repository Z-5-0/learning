import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { User } from 'src/shared/models/User';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent {
  @Input() user!: User;
  @Output() showDeleteConfirmWindow: EventEmitter<boolean> = new EventEmitter<boolean>;

  private _userService: UserService = inject(UserService);

  confirmDelete() {
    this._userService.deleteUser(this.user.name);
    this.showDeleteConfirmWindow.next(false);
  }

  cancelDelete() {
    this.showDeleteConfirmWindow.next(false);
  }
}
