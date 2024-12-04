import { I18nPluralPipe } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { User } from 'src/shared/models/User';
import { UserService } from 'src/shared/services/user.service';
import { USER_TOKEN } from 'src/shared/shared.module';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [UserService]
})
export class UserListComponent {
  @Input() type: 'interaction' | '' = '';

  userList: User[] = this.userService.getAllUsers();

  activeButton: number = 0;

  constructor(@Inject(USER_TOKEN) private userService: UserService) {

  }

  onUserDetailChange(user: (User | null), index: number) {
    this.userService.onShowUserDetails(user);
    this.activeButton = index || 0;
  }
}
