import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthFirebaseService } from "../services/auth-firebase.service";
import { inject } from "@angular/core";
import { map, Observable, take } from "rxjs";
import { AuthFirebaseUser } from "../models/AuthFirebaseUser";
import { DisableLoadingSevice } from "../services/disable-loading.service";
import { MessageService } from "../services/message.service";
import { ApiService } from "../services/api.service";

export const AuthFirebaseGuard: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> => {
        const authFirebaseService: AuthFirebaseService = inject(AuthFirebaseService);
        const router: Router = inject(Router);
        const disableLoading: DisableLoadingSevice = inject(DisableLoadingSevice);

        return authFirebaseService.firebaseUser$.pipe( // a kapott / módosított Observable-t adjuk vissza
            take(1),
            map((user: AuthFirebaseUser | null): boolean | UrlTree => { // átalakítjuk az Observable-t, és return-nek tovább adjuk 
                if (!!user) { // ha nincs user, ez az ág lép életbe
                    return true; // boolean-nel térünk vissza
                } else {
                    disableLoading.doEvent();
                    return router.createUrlTree(['/angular']); // UrlTree-val térünk vissza
                }
            })
        )
    }