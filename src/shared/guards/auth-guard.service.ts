import { inject, Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, Resolve, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { ContactComponent } from "src/app/angular/navi/contact/contact.component";
import { AboutDetailsService } from "../services/about-details.service";

export interface DeactivateComponent {
    canExit: () => boolean | Promise<boolean> | Observable<boolean>
}

@Injectable({
    providedIn: 'root'
})

export class AuthGuardService implements CanActivate, CanActivateChild, CanDeactivate<DeactivateComponent>, Resolve<any[]> { // any[] helyett lehetne Detail[]
    authService: AuthService = inject(AuthService);
    router: Router = inject(Router);
    activeRoute: ActivatedRoute = inject(ActivatedRoute);
    aboutDetailsService: AboutDetailsService = inject(AboutDetailsService);

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let isLoggedIn = this.authService.isAuthenticated()

        if (!isLoggedIn) {
            this.router.navigate(['angular', 'login']);
        }

        return isLoggedIn;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(childRoute, state);
        // return this.canActivate(this.activeRoute.snapshot, this.router.routerState.snapshot);
    }

    canDeactivate(component: DeactivateComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return component.canExit();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any[] | Observable<any[]> | Promise<any[]> { // ha Detail[]-öt specifikáltunk volna az implementálásánál, akkor Detail[] lehetne a visszatérési érték típusa
        /*
        let detailList: any[] = []
        this.aboutDetailsService.getAllDetails().subscribe((details: any[]) => { // aszinkron művelet, így a detailList = [] előbb fog visszatérni
            details = detailList;
        });
        return detailList;
        */

        return this.aboutDetailsService.getAllDetails(); // így Observable-lel térünk vissza, hiszen a getAllDetails metódus Observable-lel tér vissza

    }
}