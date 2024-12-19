import { inject, Injectable } from "@angular/core";
import { UtilsService } from "./utils.service";

interface UserInterface {
    userID: number;
    name: string;
}

@Injectable() // önmagában nem biztosítja, hogy a szolgáltatás globálisan elérhető

export class UserService {
    users: UserInterface[] = [];

    utilsService: UtilsService = inject(UtilsService);

    addUser(user: UserInterface): void {
        this.users = [...this.users, user]
    }

    removeUser(userID: number): void {
        const updatedUsers = this.users.filter((user) => userID !== user.userID);
        this.users = updatedUsers;
    }

    getUserNames(): string[] {
        return this.utilsService.pluck(this.users, 'name');
    }
}