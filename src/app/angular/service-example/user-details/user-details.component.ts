import { Component, inject, OnInit } from '@angular/core';
import { User } from 'src/shared/models/User';
import { UserService } from 'src/shared/services/user.service';
import { USER_TOKEN } from 'src/shared/shared.module';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userIsSelected: boolean = false;
  selectedUser!: User | null;

  // userService = inject(UserService);
  userService = inject(USER_TOKEN);

  ngOnInit(): void {
    this.userService.OnUserClickedEvent.subscribe((user: (User | null)) => {
      user ? this.userIsSelected = true : this.userIsSelected = false;
      this.selectedUser = user;
    })
  }
}
