import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AuthFirebaseResponse } from "../models/AuthFirebaseResponse";
import { BehaviorSubject, catchError, Observable, Subject, tap, throwError } from "rxjs";
import { AuthFirebaseUser } from "../models/AuthFirebaseUser";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })

export class AuthFirebaseService {
    firebaseAPIKey = environment.firebaseAPIKey;
    private _http: HttpClient = inject(HttpClient);

    firebaseUser$: BehaviorSubject<AuthFirebaseUser | null> = new BehaviorSubject<AuthFirebaseUser | null>(null); // kezdetben null-t, majd AuthFirebaseUser típust fog kibocsátani a BehaviorSubject

    private _router: Router = inject(Router);

    private _tokenExpireTimer: ReturnType<typeof setTimeout> | null = null;

    onSignUp(email: string, password: string): Observable<AuthFirebaseResponse> { // error esetén a handleError Observable<string>-et ad vissza
        return this._http.post<AuthFirebaseResponse>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.firebaseAPIKey}`,
            { email, password, returnSecureToken: true }
        ).pipe(
            tap((response) => {
                this.handleUser(response);
            }),
            catchError((err) => {
                return throwError(() => (this.handleError(err.error.error.message)));
            })
        );
    }

    onSignIn(email: string, password: string): Observable<AuthFirebaseResponse> { // error esetén a handleError Observable<string>-et ad vissza
        return this._http.post<AuthFirebaseResponse>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.firebaseAPIKey}`,
            { email, password, returnSecureToken: true }
        ).pipe(
            tap((response) => {
                this.handleUser(response);
            }),
            catchError((err) => {
                return throwError(() => (this.handleError(err.error.error.message)));
            })
        );
    }

    onLogout() {
        this.firebaseUser$.next(null);

        localStorage.removeItem('user');

        if (this._tokenExpireTimer) {
            clearTimeout(this._tokenExpireTimer);
        }
        this._tokenExpireTimer = null;
    }


    handleUser(resp: AuthFirebaseResponse) {
        const expireDate = new Date().getTime() + (+resp.expiresIn * 1000); // a response.expiresIn string, a + jellel számmá konvertáltuk, és mivel ms-ban van megadva, ezért megszoroztuk ezerrel
        const expires = new Date(expireDate); // a számot dátummá alakítottuk
        const user = new AuthFirebaseUser(resp.localId, resp.email, resp.idToken, expires);
        this.firebaseUser$.next(user);

        localStorage.setItem('user', JSON.stringify(user));
        this.autoLogout(+resp.expiresIn * 1000);
    }

    handleError(error: string): string { // string lesz az errorMessages[error] is
        const errorMessages: { [key: string]: string } = {
            EMAIL_NOT_FOUND: 'Invalid email address. Please try again.',
            INVALID_PASSWORD: 'Invalid password. Please try again.',
            USER_DISABLED: 'Your account has been disabled.',
            EMAIL_EXISTS: 'Email address already registered.',
            OPERATION_NOT_ALLOWED: 'This operation is not allowed.',
            TOO_MANY_ATTEMPTS_TRY_LATER: 'Too many attempts. Try again later.',
            INVALID_LOGIN_CREDENTIALS: 'Invalid email address. Please try again.'
        }

        return errorMessages[error] || 'Unknown error';
        // return throwError( () => new Error(errorMessages[error] || 'Unknown error')); // a subscribe error ágában a .message kulcs alatt van a hibaüzenet
        // a new Error(errorMessages[error] || 'Unknown error') esetében Observable<Error || string> a függvény visszatérési értéke 
    }

    autoLogin() {
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        // const user = JSON.parse(localStorage.getItem('user') ?? 'null');
        // const user = JSON.parse(localStorage.getItem('user')!); // ha biztoosak vagyunk abban, hogy lesz értéke (itt nem)

        if (!user) {
            return;
        }

        const loggedInUser = new AuthFirebaseUser(user.email, user.id, user._token, user._expiresIn);

        if (loggedInUser.token) {
            this.firebaseUser$.next(loggedInUser);
            const expirationDate = new Date(user._expiresIn);
            const timerInteger = expirationDate.getTime() - new Date().getTime();
            this.autoLogout(timerInteger);
        }
    }

    autoLogout(expireTime: number) {
        this._tokenExpireTimer = setTimeout(() => {
            this.onLogout();
        }, expireTime)
    }
}