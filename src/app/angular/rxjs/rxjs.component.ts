import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { from, fromEvent, map, Observable, of, filter, Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-angular-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class AngularRxjsComponent implements AfterViewInit, OnDestroy {
  @Input() tempSwitcher: '' | 'of' | 'of3' | 'from' | 'promise' | 'fromevent' | 'map' | 'filter' | 'mapfilter' | 'subject' = '';
  @Output() subscriptionsChanged: EventEmitter<number> = new EventEmitter<number>();

  obs1: Subscription = new Subscription;
  obs2: Subscription = new Subscription;
  obs3: Subscription = new Subscription;
  obs4: Subscription = new Subscription;
  obs5: Subscription = new Subscription;
  obs6: Subscription = new Subscription;
  obs7: Subscription = new Subscription;
  obs8: Subscription = new Subscription;
  obs9: Subscription = new Subscription;
  obs10: Subscription = new Subscription;
  obs11: Subscription = new Subscription;
  obs12: Subscription = new Subscription;
  obs13: Subscription = new Subscription;

  subscriptions: Subscription[] = [];
  subscriptions2: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {
    this.subscriptions2.subscribe({
      next: (val) => {
        this.subscriptionsChanged.emit(this.subscriptions.length + 1);
      }
    })
  }

  // ----- OF ----- //

  data: any[] = [];
  data2: any[] = [];
  array1: any[] = [1, 3, 5, 7, 9];
  array2: any[] = ['A', 'B', 'C', 'D'];

  ownObservable = of(this.array1);
  ownObservable2 = of(...this.array1);


  ofClicked() {
    this.obs1 = this.ownObservable.subscribe({
      next: (value) => {
        this.data.push(value);
      },
      error: (err) => { },
      complete: () => {
        this.data.push('completed');
      }
    });
    this.obs2 = this.ownObservable2.subscribe({
      next: (value) => {
        this.data2.push(value);
      },
      error: (err) => { },
      complete: () => {
        this.data2.push('completed');
      }
    });

    this.subscriptions = [...this.subscriptions, this.obs1];
    this.subscriptions2.next(this.obs1);
    this.subscriptions = [...this.subscriptions, this.obs2];
    this.subscriptions2.next(this.obs2);
  }

  // ----- OF 3 ----- //

  data3: any[] = [];

  ownObservable3 = of(this.array1, this.array2);

  ofClicked3() {
    this.obs3 = this.ownObservable3.subscribe({
      next: (val) => {
        this.data3.push(val);
      },
      error: (err) => { },
      complete: () => {
        this.data3.push(['completed']);
      },
    });

    this.subscriptions = [...this.subscriptions, this.obs3];
    this.subscriptions2.next(this.obs3);
  }

  // ----- FROM ----- //

  data4: any[] = [];
  array4: any[] = ['A', 'W', 'S', 'D']

  ownObservable4 = from(this.array4);

  fromClicked4() {
    this.obs4 = this.ownObservable4.subscribe({
      next: (val) => {
        this.data4.push(val);
      },
      error: (err) => { },
      complete: () => {
        this.data4.push('completed');
      }
    });

    this.subscriptions = [...this.subscriptions, this.obs4];
    this.subscriptions2.next(this.obs4);
  }

  // ----- PROMISE ----- //

  data5: any[] = [];
  data6: any[] = [];
  data7: any[] = [];
  promiseData: Promise<any> = new Promise((resolve, reject) => {
    resolve([10, 20, 30]); // A Promise ezzel az adattal tér vissza
  });

  ownObservable5 = from(this.promiseData);
  ownObservable6: Observable<any> = new Observable;
  ownObservable7 = of(this.promiseData); // Promise marad

  fromClicked5() {
    this.obs5 = this.ownObservable5.subscribe({
      next: (val) => {
        this.data5.push(val);
      },
      error: (err) => { },
      complete: () => {
        this.data5.push('completed');
      }
    });

    this.promiseData.then((resolvedValue) => {
      this.ownObservable6 = from(resolvedValue);
      // this.ownObservable6 = of(...resolvedValue); // Ugyanazt az eredményt adja

      this.obs6 = this.ownObservable6.subscribe({
        next: (val) => {
          this.data6.push(val);
        },
        error: (err) => { },
        complete: () => {
          this.data6.push('completed');
        }
      });
    });

    this.obs7 = this.ownObservable7.subscribe({
      next: (val) => {
        val.then(promiseValue => {
          this.data7.push(...promiseValue);
        })
      },
      error: (err) => { },
      complete: () => {
        this.data7.push('completed');
      }
    });

    this.subscriptions = [...this.subscriptions, this.obs5];
    this.subscriptions2.next(this.obs5);
    this.subscriptions = [...this.subscriptions, this.obs6];
    this.subscriptions2.next(this.obs6);
    this.subscriptions = [...this.subscriptions, this.obs7];
    this.subscriptions2.next(this.obs7);
  }

  // ----- FROMEVENT ----- //

  @ViewChild('createbutton') // alias, vagy referencia változó, argumentumként átadva
  createButton!: // a gomb referenciáját tárolja - megmondtuk a Typescriptnek, hogy higyje el, hogy lesz értéke
    ElementRef // gomb, úgyhogy ElementRef

  createButtonObservable: Observable<Event> = new Observable<Event>;

  @ViewChild('itemContainer') itemContainer!: ElementRef;

  onCreateButtonClicked() {
    let counter = 0;
    this.createButtonObservable = fromEvent(this.createButton.nativeElement, 'click'); // Observable-t ad vissza
    this.obs8 = this.createButtonObservable
      .subscribe({ // ne felejtsünk el objektumot használni
        next: (val) => {
          this.createNewItem(++counter);
        },
        error: (err) => { },
        complete: () => { }
      });

    this.subscriptions = [...this.subscriptions, this.obs8];
  }

  ngAfterViewInit(): void {
    if (this.tempSwitcher === 'fromevent') { // Különben elszállna a JS futás
      this.onCreateButtonClicked();
    }
  }

  createNewItem(counter: number) {
    const newElem = document.createElement('div');
    newElem.innerText = 'Elem ' + counter;
    this.itemContainer.nativeElement.appendChild(newElem);
  }

  // ----- MAP ----- //

  data8: any[] = [];
  data8_trans: any[] = [];
  array8: any[] = [2, 4, 6, 8, 10];

  ownObservable8 = from(this.array8);
  transformObservable8 = this.ownObservable8.pipe(
    map((val) => {
      return val * 5;
    })
  );

  fromClicked8() {
    this.obs9 = this.ownObservable8.subscribe({
      next: (value) => {
        this.data8.push(value);
      },
      error: (err) => { },
      complete: () => { },
    });
    this.obs10 = this.transformObservable8.subscribe({
      next: (value) => {
        this.data8_trans.push(value);
      },
      error: (err) => { },
      complete: () => { },
    });

    this.subscriptions = [...this.subscriptions, this.obs9];
    this.subscriptions2.next(this.obs9);
    this.subscriptions = [...this.subscriptions, this.obs10];
    this.subscriptions2.next(this.obs10);
  }

  // ----- FILTER ----- //

  data9: any[] = [];
  data9_filtered: any[] = [];
  array9: any[] = [2, 4, 6, 8, 10, 12];

  ownObservable9 = from(this.array9);
  filterObservable9 = this.ownObservable9.pipe(
    filter((val) => val % 4 === 0)
  );

  fromClicked9() {
    this.obs11 = this.ownObservable9.subscribe({
      next: (value) => {
        this.data9.push(value);
      },
      error: (err) => { },
      complete: () => { },
    });
    this.obs12 = this.filterObservable9.subscribe({
      next: (value) => {
        this.data9_filtered.push(value);
      },
      error: (err) => { },
      complete: () => { },
    });

    this.subscriptions = [...this.subscriptions, this.obs11];
    this.subscriptions2.next(this.obs11);
    this.subscriptions = [...this.subscriptions, this.obs12];
    this.subscriptions2.next(this.obs12);
  }


  // ----- MAPFILTER ----- //

  data10: any[] = [];
  array10: any[] = [2, 4, 6, 8, 10, 12];
  // map: 10, 20, 30, 40, 50, 60
  // filter: 20, 40, 60

  ownObservable10 = from(this.array10);
  mapFilterObservable10 = this.ownObservable10.pipe(
    map( (val) => val * 5),
    filter((val) => val % 4 === 0)
  );

  fromClicked10() {
    this.obs13 = this.mapFilterObservable10.subscribe({
      next: (value) => {
        this.data10.push(value);
      },
      error: (err) => { },
      complete: () => { },
    });

    this.subscriptions = [...this.subscriptions, this.obs13];
    this.subscriptions2.next(this.obs13);
  }

  // ----- MAPFILTER ----- //

  

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
