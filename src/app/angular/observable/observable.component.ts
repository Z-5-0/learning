import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.scss']
})
export class ObservableComponent {
  @Input() tempSwitcher: '' | 'array' | 'arrayStream' | 'arraySteamWithTimeOut' | 'error' | 'complete' | 'depricated' = '';

  // --------- Array --------- // 

  data: number[] = [];

  dataObservable = new Observable<number[]>((observer) => {
    observer.next([1, 2, 3, 4, 5]);
  });

  getAsyncDataByClick() {
    this.dataObservable.subscribe(
      (next: number[]) => {
        this.data = next;
      },
      (error) => { },
      () => { }
    )
  }

  // --------- Stream of array --------- // 

  data2: number[] = [];

  dataObservable2 = new Observable<number>((observer) => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.next(4);
    observer.next(5);
  });

  getAsyncDataByClick2() {
    this.dataObservable2.subscribe(
      (next: number) => {
        this.data2.push(next);
      },
      (error) => { },
      () => { }
    )
  }

  // --------- Stream of array with setTimeOut --------- // 

  data3: number[] = [];

  dataObservable3 = new Observable<number>((observer) => {
    setTimeout(() => {
      observer.next(1);
    }, 1000);
    setTimeout(() => {
      observer.next(2);
    }, 2000);
    setTimeout(() => {
      observer.next(3);
    }, 3000);
    setTimeout(() => {
      observer.next(4);
    }, 4000);
    setTimeout(() => {
      observer.next(5);
    }, 5000);
  });

  getAsyncDataByClick3() {
    this.dataObservable3.subscribe(
      (next: number) => {
        this.data3.push(next);
      },
      (error) => { },
      () => { }
    )
  }

  // --------- Error method --------- // 

  data4: any[] = [];

  dataObservable4 = new Observable<number>((observer) => {
    setTimeout(() => { observer.next(1) }, 1000);
    setTimeout(() => { observer.next(2) }, 2000);
    setTimeout(() => { observer.next(3) }, 3000);
    setTimeout(() => { observer.error(new Error('Something went wrong')) }, 3000);
    setTimeout(() => { observer.next(4) }, 4000);
    setTimeout(() => { observer.next(5) }, 5000);
  });

  getAsyncDataByClick4() {
    this.dataObservable4.subscribe(
      (next: number) => {
        this.data4.push(next);
      },
      (err) => {
        this.data4.push(err.message);
        // this.data4.push(error);
        // console.log(error);
      },
      () => { }
    )
  }

  // --------- Complete method --------- // 

  data5: any[] = [];

  dataObservable5 = new Observable<number>((observer) => {
    setTimeout(() => { observer.next(1) }, 1000);
    setTimeout(() => { observer.next(2) }, 2000);
    setTimeout(() => { observer.next(3) }, 3000);
    setTimeout(() => { observer.next(4) }, 4000);
    setTimeout(() => { observer.next(5) }, 5000);
    setTimeout(() => { observer.complete() }, 6000);
  });

  getAsyncDataByClick5() {
    this.dataObservable5.subscribe(
      (next: number) => {
        this.data5.push(next);
      },
      (err) => {
      },
      () => {
        this.data5 = ['Data stream successfully completed'];
      }
    )
  }

  // --------- Without depricated subscribe --------- // 

  data6: any[] = [];

  dataObservable6 = new Observable<number>((observer) => {
    setTimeout(() => { observer.next(1) }, 1000);
    setTimeout(() => { observer.next(2) }, 2000);
    setTimeout(() => { observer.next(3) }, 3000);
    setTimeout(() => { observer.next(4) }, 4000);
    setTimeout(() => { observer.next(5) }, 5000);
    setTimeout(() => { observer.complete() }, 6000);
  });

  getAsyncDataByClick6() {
    this.dataObservable6.subscribe({
      next: (value: any) => { this.data6.push(value) },
      error: (err) => { this.data4.push(err.message) },
      complete: () => { this.data6 = ['Data stream successfully completed'] }
    })
  }
}