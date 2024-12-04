import { inject, Injectable } from "@angular/core";
import { AuthUserService } from "./auth-user.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    isLogged: boolean = false; // property
    isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private _authUserService: AuthUserService = inject(AuthUserService);

    login(username: string, password: string) {
        let user = this._authUserService.users.find(u => (u.username === username && u.password === password));

        this.isLogged = !!user;
        this.isLoggedIn$.next(true);

        return user;
    }

    logoff() {
        this.isLogged = false;
        this.isLoggedIn$.next(false);
    }

    isAuthenticated() {
        return this.isLogged;
    }
}