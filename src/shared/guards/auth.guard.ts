import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { AboutDetailsService } from "../services/about-details.service";

export const CanActivate = () => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    let isLoggedIn = authService.isAuthenticated()

    if (!isLoggedIn) {
        router.navigate(['angular', 'login']);
    }

    return isLoggedIn;
}

export const CanActivateChild = () => {
    return CanActivate();
}

export const resolve = () => {
    const aboutDetailsService: AboutDetailsService = inject(AboutDetailsService);
    return aboutDetailsService.getAllDetails();
}