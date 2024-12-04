import { EventEmitter, inject, Injectable } from "@angular/core";
import { User } from "../models/User";
import { LoggerService } from "./logger.service";
import { Subject } from "rxjs";

@Injectable()

export class UserService {
    OnUserClickedEvent: EventEmitter<User | null> = new EventEmitter<User | null>;

    users: User[] = [
        new User('Carl Smith', 'male', 'Monthly', 'active'),
        new User('Johanna Bree', 'female', 'Monthly', 'inactive'),
        new User('Max King', 'male', 'Yearly', 'active')
    ];

    /* constructor(private logger: LoggerService) {

    } */

    subService = inject(LoggerService);

    usersSubject = new Subject<User[]>();

    getAllUsers() {
        return this.users;
    }

    getAllUsersWithFakeAPI() {
        setTimeout(() => {
            this.usersSubject.next(this.users); // Az adatok elküldése a Subjecten keresztül
        }, 2000);
        return this.usersSubject.asObservable(); // Observable-t adunk vissza
    }

    addNewUser({ name, gender, subType, status }: { name: string, gender: string, subType: string, status: string }) {
        let user = new User(name, gender, subType, status);
        this.users.push(user);

        // this.logger.logMessage(name, status);

        this.subService.logMessage(name, status);
    }

    onShowUserDetails(user: (User | null)) {
        this.OnUserClickedEvent.emit(user);
    }

    deleteUser(userName: string) {
        let selectedUserIndex = this.users.findIndex(user => user.name === userName);
        this.users.splice(selectedUserIndex, 1);
    }
}