import { Component, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthFirebaseResponse } from 'src/shared/models/AuthFirebaseResponse';
import { ApiService } from 'src/shared/services/api.service';
import { AuthFirebaseService } from 'src/shared/services/auth-firebase.service';

@Component({
  selector: 'app-authlogin',
  templateUrl: './authlogin.component.html',
  styleUrls: ['./authlogin.component.scss']
})
export class AuthloginComponent {
  @Output() errorEvent: EventEmitter<any> = new EventEmitter<any>();
  private _apiService: ApiService = inject(ApiService);
  private _authFirebase: AuthFirebaseService = inject(AuthFirebaseService);
  private _router: Router = inject(Router);

  userSignedUp = true;

  isLoading: boolean = false;
  showToast: boolean = false;

  errorMessage: string = '';

  authObservable$: Observable<AuthFirebaseResponse> = new Observable<AuthFirebaseResponse>;

  submitForm(form: NgForm) {
    this.isLoading = true;
    if (this.userSignedUp) {
      this.authObservable$ = this._authFirebase.onSignIn(form.value.email, form.value.password)
      /* .subscribe({
        next: (val) => {
          console.log('SignUp: ', val);
          this.isLoading = false;
        },
        error: (err) => this.onErrorHappens(err)
      }); */
    } else {
      this.authObservable$ = this._authFirebase.onSignUp(form.value.email, form.value.password)
      /* .subscribe({
        next: (val) => {
          console.log('SignIn: ', val);
          this.isLoading = false;
        },
        error: (err) => this.onErrorHappens(err)
      }); */
    }

    this.authObservable$.subscribe({
      next: (val) => {
        this.isLoading = false;
        this._router.navigate(['/', 'angular']);
        this._apiService.getTasks();
      },
      error: (err) => this.onErrorHappens(err)
    });

    form.reset();
  }

  onErrorHappens(errorMessage: string) {
    this.isLoading = false;
    this.showToast = true;
    this.errorMessage = errorMessage;
  }
}
