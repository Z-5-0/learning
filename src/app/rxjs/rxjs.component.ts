import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { filter, from, fromEvent, interval, map, mergeMap, switchMap, take, tap } from "rxjs";
import * as rxjs from "rxjs";
import { ajax } from "rxjs/ajax";
import { ScrollingService } from "../../shared/services/scrolling.service";

/* import * as rxjs from "rxjs";
import {Observable} from "rxjs";

const {interval, fromEvent, from, of} = rxjs;
const {
  map,
  take,
  filter,
  tap,
  mergeMap,
  switchMap,
  catchError,
} = rxjs; */

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})

export class RxjsComponent implements OnInit, AfterViewInit {
  @ViewChildren(`
    rxjs,
    rxjs_,
    examples,
    components,
    operators,
    `) sections!: QueryList<ElementRef>;

  anchorButtons: any[] = [
    { title: 'RxJS', anchor: 'rxjs', subtitles: [] },
    { title: 'RxJS+', anchor: 'rxjs_', subtitles: [] },
    { title: 'Examples', anchor: 'examples', subtitles: [] },
    { title: 'Components', anchor: 'components', subtitles: [] },
    { title: 'Operators', anchor: 'operators', subtitles: [] },
  ]

  @ViewChild('button') button!: ElementRef<HTMLButtonElement>;
  @ViewChild('clickButton') clickButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('colorForm') colorForm!: ElementRef<HTMLFormElement>;
  @ViewChild('colorFormForMergeMap') colorFormForMergeMap!: ElementRef<HTMLFormElement>;
  @ViewChild('switchMapButton') switchMapButton!: ElementRef<HTMLButtonElement>;

  buttonClickedObservable$: rxjs.Observable<number> | null = null;
  buttonClickedObservableSteamCompleted: boolean = false;

  switchMapArray: any[] = [];

  constructor(private anchor: ScrollingService) {
  }

  ngOnInit() {
    console.log('RXJS library', rxjs);
    this.someTesting();
  }

  ngAfterViewInit() {
    this.fromEventButtonClick();
    this.setIntervalObservable();
    this.fromEventFormSubmit();
    this.mergeMapTesting();
    this.switchMapTesting();
  }

  someTesting() {
    // const numbers$ = of(1, 2, 3, 4, 5);
    // numbers$.subscribe(value => console.log(value));

    const array$ = from([
      10,
      20,
      new Promise(resolve => resolve('Hello'))])
      .pipe(
        mergeMap(item => {
          if (item instanceof Promise) {
            return from(item);
          } else {
            return from([item]);
          }
        })
      );
    array$.subscribe(value => console.log(value));

    // const timer$ = timer(20000, 1000);
    // timer$.subscribe(value => console.log(value));
  }

  fromEventButtonClick() {
    /*
    const buttonClickedExists = document.getElementById('clickButton');
    let buttonClickedObservable$ = new Observable();

    if (buttonClickedExists) {
      buttonClickedObservable$ = fromEvent(buttonClickedExists, 'click')
        .pipe(
          map((event: any) => event.clientX)
        );
    }
    */

    this.buttonClickedObservable$ = fromEvent(this.clickButton.nativeElement, 'click')
      .pipe(
        map((event: any) => {
          // throw new Error('Manuális hiba: throw new Error()');
          return event.clientX;
        }),
        take(5)
      );

    this.buttonClickedObservable$.subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log('HIBA: ', err)
      },
      complete: () => {
        console.log('fromEvent completed!');
        this.buttonClickedObservableSteamCompleted = true;
      },
    });
  }

  setIntervalObservable() {
    const counter = interval(1000).pipe(
      filter(inputData => (inputData % 2 === 0)),
      map(filteredData => filteredData + ' másodperc telt el'),
      take(5)
    );

    counter.subscribe((data) => {
      console.log(data);
    });
  }

  fromEventFormSubmit() {
    /* const colorForm = document.getElementById("szin-form");
    if (colorForm) {
      const formElkuldve$ = fromEvent(
        colorForm,
        "submit"
      );
    } */

    const formSent$ = fromEvent(
      this.colorForm.nativeElement,
      "submit"
    ).pipe(
      tap(event => {
        event.preventDefault();
      }),
      map((event: any) => event.target.elements.color.value)
    );

    formSent$.subscribe(color => {
      console.log('%c ' + color, 'color: ' + color);
    })
  }

  mergeMapTesting() {
    const formSent$ = fromEvent(this.colorFormForMergeMap.nativeElement, "submit").pipe(
      tap(event => {
        event.preventDefault();
      }),
      map((event: any) => event.target.elements.color.value),
      mergeMap(color => counter$
        .pipe(
          map(text => {
            return [color, text];
          })
        )),
      take(20)
    );

    const counter$ = interval(1000).pipe(
      filter(inputData => inputData % 2 === 0),
      map(data => data + " másodperc telt el"),
    );

    formSent$.subscribe(([color, text]) => {
      // console.log('%c ' + color, 'color: ' + text);
      console.log('%c ' + text, 'color: ' + color);
    });
  }

  switchMapTesting() {
    const ajaxRequest = ajax('https://kodbazis.hu/api/cimek').pipe(
      map(event => event.response),
    );

    const switchMapButtonClicked$ = fromEvent(this.switchMapButton.nativeElement, 'click')
      .pipe(
        switchMap(() => ajaxRequest)
      );

    switchMapButtonClicked$.subscribe((resp) => {
      console.log(resp);
      this.switchMapArray = resp as [];
    });
  }

  scrollToAnchor(anchor: string) {
    const sectionElement = this.sections.find(sec => sec.nativeElement.getAttribute('data-anchor') === anchor)?.nativeElement;
    if (sectionElement) {
      this.anchor.scrollTo(sectionElement);
    } else {
      alert('No anchor provided for this button!')
    }
  }
}
