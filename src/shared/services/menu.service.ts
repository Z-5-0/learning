import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  outsideClickSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);

  setWorkingState(newState: boolean) {
    this.outsideClickSubject.next(newState);
  }

  onStateChange() {
    return this.outsideClickSubject.asObservable();
  }
}
