import { Injectable } from "@angular/core";
import { BehaviorSubject, take } from "rxjs";

interface UserInterface {
    userID: number;
    name: string;
}

@Injectable()

export class UserServiceRxJS {
    users$: BehaviorSubject<UserInterface[]> = new BehaviorSubject<UserInterface[]>([])

    addUser(user: UserInterface): void {
        this.users$.next([...this.users$.getValue(), user]);

        /* this.users$ // így teljesen reaktív maradna az addUser függvény
            .pipe(take(1)) // csak az aktuális értéket vesszük egyszer
            .subscribe((users) => {
                this.users$.next([...users, user]);
            }); */
    }

    removeUser(userID: number): void {
        const updatedUsers = this.users$
            .getValue()
            .filter((user) => userID !== user.userID);
        this.users$.next(updatedUsers);

        /* this.users$ // így teljesen reaktív maradna a removeUser függvény
        .pipe(take(1)) // csak az aktuális értéket vesszük egyszer
        .subscribe((users) => {
            const updatedUsers = users.filter((user) => user.userID !== userID);
            this.users$.next(updatedUsers);
        }); */
    }
}