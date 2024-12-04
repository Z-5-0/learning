import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  router: Router = inject(Router);
  private _authService: AuthService = inject(AuthService);

  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this._authService.isLoggedIn$.subscribe(val => {
      this.isLoggedIn = val;
    });
  }

  onNavigate(route: string) {
    this.router.navigateByUrl(`/angular${route ? '/' + route : ''}`);
  }
}
