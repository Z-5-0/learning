import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  router: Router = inject(Router);

  onNavigate(route: string) {
    this.router.navigateByUrl(`/angular/${route}`);
  }
}
