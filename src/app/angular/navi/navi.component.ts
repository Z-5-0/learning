import { Component, inject, Input, OnInit } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AuthFirebaseService } from 'src/shared/services/auth-firebase.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.scss']
})
export class NaviComponent implements OnInit {
  @Input() tempSwitcher: 'default' | 'relativeabsolute' | 'spa' | 'http' | 'module' | 'standalone' = 'default';

  private _router: Router = inject(Router);
  showLoader: boolean = false;

  showUserManagementStartButton: boolean = true;

  private _authFirebaseService: AuthFirebaseService = inject(AuthFirebaseService);

  constructor() {
    this._router.url.includes('http:dashboard') ? this.showUserManagementStartButton = false : this.showUserManagementStartButton = true;
  }

  ngOnInit(): void {
    this._router.events.subscribe((routerEvent: Event) => { // callback function, ami az event object-et kapja meg
      if (routerEvent instanceof NavigationStart) {
        // if (routerEvent.url === '/angular/resolve') { // arra lenne hivatott, hogy ha a contact page-ről elnavigálunk, de a confirm-nél Cancel-re kattintunk, ne jöjjön elő az overlay, de a lenti NavigationCancel sokkal elegánsabb
        this.showLoader = true;
        // }
      }

      if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationError) { // NavigationError, hogy ha hiba történik, ne maradjon ott az overlay
        // if (routerEvent.url === '/angular/resolve') {
        this.showLoader = false;
        //}

        this._router.url.includes('http:dashboard') ? this.showUserManagementStartButton = false : this.showUserManagementStartButton = true;
      }
    });

    this._authFirebaseService.autoLogin();
  }
}
