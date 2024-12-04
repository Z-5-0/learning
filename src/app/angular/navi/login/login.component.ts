import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('username') username!: ElementRef; // az felhasználónevet tartalmazó input element referenciájának tárolására
  @ViewChild('password') password!: ElementRef;  // a jelszót tartalmazó input element referenciájának tárolására

  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);
  private _activeRouter: ActivatedRoute = inject(ActivatedRoute);


  message: string = '';

  ngOnInit(): void {
    this._activeRouter.queryParamMap.subscribe(queries => {
      const logout = Boolean(queries.get('logout')); // = !!queries.get('logout');
      if (logout) {
        this._authService.logoff();
        this.message = 'You have been logged out!'
      }
    });
  }

  onLogin() {
    const username = this.username.nativeElement.value;
    const password = this.password.nativeElement.value;

    const user = this._authService.login(username, password);

    !user ? this.message = 'Incorrect credentials!' : (this.message = `Hi there ${user.name}!`, this._router.navigate(['..', 'angular', 'about']));
  }
}
