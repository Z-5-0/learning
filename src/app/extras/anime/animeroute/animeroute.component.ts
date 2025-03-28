import { Component, signal } from '@angular/core';
import { routeTransition } from './route-transition';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';

export interface Link {
  label: string;
  path: string;
  exact?: boolean;
}

@Component({
  selector: 'app-animeroute',
  templateUrl: './animeroute.component.html',
  styleUrls: ['./animeroute.component.scss'],
  animations: [
    routeTransition
  ]
})
export class AnimerouteComponent {
  protected links: Link[] = [
    { label: 'Home', path: 'home' },
    { label: 'Contact', path: 'contact' }
  ];
  protected isVisible = signal(false);

  protected url = '';

  constructor(protected activeRoute: ActivatedRoute, protected router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    });
  }
}
