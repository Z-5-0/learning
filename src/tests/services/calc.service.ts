import { inject, Injectable } from '@angular/core';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class CalcService {
  sharedService: SharedService = inject(SharedService);

  constructor() { }

  multiply(a: number, b: number): number {
    let shared = this.sharedService.sharedFunction(a, b); // ha spyOn-t használunk, és nem mock-olunk, akkor a shared értéke undefined lesz
    return a * b;
  }

  add(a: number, b: number) {
    return a + b;
  }

  multiplyError(a: number, b: number): number {
    if (a < 0 || b < 0) {
      throw new Error('Negative numbers are not allowed');
    }
    return a * b;
  }
}
