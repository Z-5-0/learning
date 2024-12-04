import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { exhaustMap, Observable, take, tap } from "rxjs";
import { AuthFirebaseService } from "./auth-firebase.service";
import { inject } from "@angular/core";
import { AuthFirebaseUser } from "../models/AuthFirebaseUser";

export class AuthInterceptorService implements HttpInterceptor {
    private _authFirebaseService: AuthFirebaseService = inject(AuthFirebaseService);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { // a next.handle(modifiedRequest) adja vissza az Observable-t
        return this._authFirebaseService.firebaseUser$ // return, mert vissza kell adni az Observable-t az Interceptornak
            .pipe(
                take(1),
                exhaustMap((user: AuthFirebaseUser | null) => {
                    if (!user) {
                        return next.handle(req); // amennyiben nincs user (null), az eredeti request fog kiküldésre kerülni
                    }
                    const modifiedRequest = req.clone({
                        params: new HttpParams().set('auth', user?.token || '')
                    });
                    return next.handle(modifiedRequest);
                })
            );
    }

    /* intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { // a next.handle(modifiedRequest) adja vissza az Observable-t
        // console.log('auth: ', req);
        // const modifiedRequest = req.clone({ headers: req.headers.append('auth', 'ok') }); // az eredeti header-öknöz hozzáadunk még egyet
        const modifiedRequest = req.clone(); // az eredeti header-öknöz hozzáadunk még egyet
        return next.handle(modifiedRequest)
            .pipe(
                tap((event) => {
                    if (event.type === HttpEventType.Response) {
                        // console.log('resp: ', event); // a body-ban van az adat, amit a szervertől visszakapunk
                    }
                })
            );
    } */
}