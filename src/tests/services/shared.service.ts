import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  sharedFunction(a?: number, b?: number) {
    return ('Calc service multiply function values');
  }
}
