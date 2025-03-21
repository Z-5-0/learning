import { Component, signal } from '@angular/core';

export interface Link {
  label: string;
  path: string;
  exact?: boolean;
}

@Component({
  selector: 'app-animeroute',
  templateUrl: './animeroute.component.html',
  styleUrls: ['./animeroute.component.scss']
})
export class AnimerouteComponent {
  protected links: Link[] = [
    { label: 'Home', path: 'home' },
    { label: 'About', path: 'about' },
    { label: 'Contact', path: 'contact' }
  ];
  protected isVisible = signal(false);

}
