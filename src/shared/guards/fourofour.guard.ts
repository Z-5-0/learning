import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const YouCantActivate = () => {
    const router: Router = inject(Router);

    router.navigate(['angular', '404']);

    return false;
}