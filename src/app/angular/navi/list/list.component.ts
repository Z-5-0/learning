import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, Subject, switchMap, tap} from "rxjs";
import {ajax} from "rxjs/ajax";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  testSubject = new Subject<string>();
  testObservable = new Observable<string>(subscriber => {
    subscriber.next('Value 1');
    subscriber.next('Value 2');
    subscriber.next('Value 3');
    subscriber.complete(); // Jelzi, hogy az adatfolyam befejeződött
  });

  // Reaktív megvalósítás switchMap()-pel

  albumsReactive$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  // Az albumsReactive$-ra next-elve elindul a lekérés
  get$ = this.albumsReactive$.pipe(
    tap((albumsReactive$defaultValue) => {
      // console.log('albumsReactive$defaultValue: ', albumsReactive$defaultValue);
      // Nem piszkáljuk az adatfolyamot, csak a BehaviorSubject kezdeti értékét kiírjuk ( console.log() ).
      // Itt még felhasználhatjuk a BehaviorSubject kezdeti értékét.
    }),
    switchMap(() => this.http.get('https://jsonplaceholder.typicode.com/albums')),
    catchError(err => of([])),
    tap(data => {
      // console.log('data: ', data);
      // this.albumsReactive$.next(data); // Végtelen ciklusba kerülünk.
    })
  )

  // Reaktív megvalósítás switchMap()-pel 2
  // Létrehozunk egy Subject-et, ami az adatfolyam indítója lesz
  subject$ = new Subject<void>();

  // `get$` Observable, ami az adatfolyamot kezel
  get2$ = this.subject$.pipe(
    switchMap(() => this.http.get<any[]>('https://jsonplaceholder.typicode.com/albums')
      /* .pipe( // A HTTP kérés hibáját is le lehetne kezelni
        catchError(err => {
          // console.error('Fetch error: ', err);
          return of([]); // Hiba esetén üres tömböt ad vissza
        })
      ) */
    ),
    catchError(err => of([])),
    tap(data => {
      // console.log('Get 2 result: ', data);
      this.albumsReactive$.next(data as any[]);
    })
  );

  constructor(private http: HttpClient) {

    // Fetch API használata (Vanilla JS)

    fetch('https://jsonplaceholder.typicode.com/albums') // Promise<response>
      .then(response => response.json())// Promise<any>
      .then(data => { // data: Album[] - az API válasza, JSON-né alakított válasz
        // console.log('Fetch data: ', data);
      })
      .catch(error => { // error: Error - hiba esetén
        // console.error('Fetch error: ', error);
      })
      .finally(() => { // Finally: a Promise befejeződött
        // console.log('Fetch operation completed.');
      });

    // Angular HttpClient get metódus

    const albums = this.http.get<any>('https://jsonplaceholder.typicode.com/albums').pipe( // Az albums egy Subscription
      tap(data => { // data: Album[] - az API válasza
        // console.log('Data: ', data);
      }),
      catchError(err => { // err: HttpErrorResponse - hiba esetén
        console.error('Error: ', err);
        return of([]);
      })
    ).subscribe(
      response => { // response: Album[] - az API válasza
        // console.log('Response: ', response);
      },
      error => { // error: HttpErrorResponse - hiba esetén
        // console.error('Error: ', error);
      },
      () => { // Complete: az Observable befejeződött
        // console.log('Observable completed.');
      }
    );

    // RxJS ajax használata

    ajax({ // Az `ajax` metódus visszaad egy Observable-t, amely egy HTTP válasz objektumot tartalmaz.
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/albums',
    }).pipe(
      tap(response => { // response: HttpResponse - az adatot tartalmazó HTTP válasz objektum
        // console.log('AJAX: ', response.response); // response.response: Album[]
      })
    ).subscribe( // Deprecated!
      (data: any) => { // data: AjaxResponse - az API válasza
        // console.log('Albums 1:', data.response);
      },
      error => { // error: Error - hiba esetén
        // console.error('Error: ', error);
      },
      () => { // Complete: az Observable befejeződött
        // console.log('Observable completed.');
      }
    );

    // RxJS ajax getJSON metódus használata

    ajax.getJSON('https://jsonplaceholder.typicode.com/albums').pipe( // `getJSON` metódus visszaad egy Observable-t, amely a JSON adatot közvetlenül tartalmazza.
      tap(data => { // data: Album[] - az API válasza
        // console.log('AJAX getJSON: ', data);
      })
    ).subscribe( // Deprecated!
      data => { // data: Album[] - az API válasza
        // console.log('Albums:', data);
      },
      error => { // error: Error - hiba esetén
        // console.error('Error: ', error);
      },
      () => { // Complete: az Observable befejeződött
        // console.log('Observable completed.');
      }
    );
  }

  ngOnInit() {
    this.get$.subscribe();
    /* this.get2$.subscribe(
      data => {
        // console.log('!!!!! Received data !!!!! ', data);
      },
      error => {
        // console.error('Received error: ', error);
      },
      () => {
        // console.log('Observable completed.');
      }
    ); */

    this.get2$.subscribe();

    this.subject$.next();

    // Feliratkozás a Subject-re
    this.testSubject.subscribe(value => console.log('Subscriber 1:', value));
    this.testSubject.subscribe(value => console.log('Subscriber 2:', value));

    this.testObservable.subscribe(value => console.log('Observable sub 1:', value));
    this.testObservable.subscribe(value => console.log('Observable sub 2:', value));

    // Értékek kibocsátása
    this.testSubject.next('Hello');
    this.testSubject.next('World');
  }
}
