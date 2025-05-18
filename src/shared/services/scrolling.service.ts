import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollingService {

  constructor() {
  }

  scrollTo(target: HTMLElement): void {
    const openDropdown = document.querySelector('.dropdown-menu.show');
    if (openDropdown) {
      openDropdown.classList.remove('show');
    }

    const toggle = document.querySelector('.dropdown-toggle.show');
    if (toggle) {
      toggle.classList.remove('show');
      (toggle as HTMLElement).setAttribute('aria-expanded', 'false');
    }

    return target.scrollIntoView({ behavior: 'smooth' });
  }
}
