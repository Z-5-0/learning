import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollingService {

  constructor() {
  }

  scrollTo(target: HTMLElement): void {
    return target.scrollIntoView({behavior: 'smooth'});
  }
}
