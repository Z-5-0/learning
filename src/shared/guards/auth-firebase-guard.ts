import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthFirebaseService } from "../services/auth-firebase.service";
import { inject } from "@angular/core";
import { map, Observable, take } from "rxjs";
import { AuthFirebaseUser } from "../models/AuthFirebaseUser";

export const AuthFirebaseGuard: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> => {
        const authFirebaseService: AuthFirebaseService = inject(AuthFirebaseService);
        const router: Router = inject(Router);

        return authFirebaseService.firebaseUser$.pipe( // a kapott / módosított Observable-t adjuk vissza
            take(1),
            map((user: AuthFirebaseUser | null): boolean | UrlTree => { // átalakítjuk az Observable-t, és return-nek tovább adjuk 
                if (!!user) { // ha nincs user, ez az ág lép életbe
                    return true; // boolean-nel térünk vissza
                } else {
                    return router.createUrlTree(['/angular']); // UrlTree-val térünk vissza
                }
            })
        )
    }