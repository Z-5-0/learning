import { AfterViewInit, Component, ComponentFactoryResolver, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/shared/models/User';
import { UserService } from 'src/shared/services/user.service';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { ViewContainer } from 'src/shared/directives/viewcontainer.directive';
import { Observable, Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild('confirmDelete') confirmDelete!: ConfirmDeleteComponent;

  userList: User[] = [];
  private _userService: UserService = inject(UserService);
  private _componentFactoryResolver: ComponentFactoryResolver = inject(ComponentFactoryResolver);

  showConfirmDeleteComponent: boolean = false;
  selectedUser!: User;

  @ViewChild(ViewContainer, { static: false }) container!: ViewContainer;
  private confirmationSubscription: Subscription = new Subscription();

  constructor() {
  }

  ngOnInit(): void {
    this._userService.getAllUsersWithFakeAPI().subscribe((users: User[]) => {
      this.userList = users;
    });
  }

  deleteUser(user: User) {
    this.selectedUser = user;
    this.showConfirmDeleteComponent = true;
  }

  showConfirmDelete(user: User) {
    const confirmDeleteComponenetFactory =
      this._componentFactoryResolver
        .resolveComponentFactory(ConfirmDeleteComponent);

    const containerViewRef = this.container.viewContainer;  // a template-ben lévő div referenciáját tartalmazza

    containerViewRef.clear();  // ha esetleg a div containerünk nem üres, kitöröljük a tartalmát

    const componentRef = containerViewRef.createComponent(confirmDeleteComponenetFactory); // renderelés
    componentRef.instance.user = user; // user átadása a példánynak

    this.confirmationSubscription = componentRef.instance.showDeleteConfirmWindow.subscribe((data) => {
      this.confirmationSubscription.unsubscribe;
      containerViewRef.clear();

      if (data) {
        // Delete the user
        this.selectedUser = user;
        this._userService.deleteUser(this.selectedUser.name);
      }
    });
  }
}
