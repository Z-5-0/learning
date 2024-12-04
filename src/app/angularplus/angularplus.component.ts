import { Component, ElementRef, QueryList, ViewChildren, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ScrollingService } from "../../shared/services/scrolling.service";
import { BehaviorSubject, catchError, of, Subject, Subscription, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-angularplus',
  templateUrl: './angularplus.component.html',
  styleUrls: ['./angularplus.component.scss']
})
export class AngularplusComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(`
    scrollpositionrestoration,
    dependencyinjection,
    modulewithrouting,
    functioninputoutputtypes,
    ngiffunctioncall,
    trackby,
    ngswitchnote,
    prtoceduralvsreactivethinking,
    locale,
    restandspreadoperator,
    shallowanddeepcopy,
    datamodel,
    environment,
    authenticationandauthorization,
    throwerror,
    angularperformanceincrease,
    todo
    `) sections!: QueryList<ElementRef>;

  anchorButtons: any[] = [
    { title: 'scrollPositionRestoration', anchor: 'scrollpositionrestoration', subtitles: [] },
    { title: 'Dependency injection', anchor: 'dependencyinjection', subtitles: [] },
    { title: 'Module with routing', anchor: 'modulewithrouting', subtitles: [] },
    { title: 'Function input-output types', anchor: 'functioninputoutputtypes', subtitles: [] },
    { title: 'ngIf function call', anchor: 'ngiffunctioncall', subtitles: [] },
    { title: 'TrackBy', anchor: 'trackby', subtitles: [] },
    { title: 'ngSwitch note', anchor: 'ngswitchnote', subtitles: [] },
    { title: 'Procedural vs reactive thinking', anchor: 'prtoceduralvsreactivethinking', subtitles: [] },
    { title: 'Locale', anchor: 'locale', subtitles: [] },
    { title: 'Rest and spread operator', anchor: 'restandspreadoperator', subtitles: [] },
    { title: 'Shallow and deep copy', anchor: 'shallowanddeepcopy', subtitles: [] },
    { title: 'Data model', anchor: 'datamodel', subtitles: [] },
    { title: 'Environment', anchor: 'environment', subtitles: [] },
    { title: 'Authentication & authorization', anchor: 'authenticationandauthorization', subtitles: [] },
    { title: 'throwError', anchor: 'throwerror', subtitles: [] },
    { title: 'Angular performance increase', anchor: 'angularperformanceincrease', subtitles: [] },
    { title: 'TODO', anchor: 'todo', subtitles: [] }
  ];

  elems: string[] = [];
  elemsReactive$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  elemLocalDeletion: boolean = true;
  isLoading: boolean = false;
  isLoadingReactive$ = new BehaviorSubject<boolean>(true);

  refresh$ = new Subject().pipe(
    tap(() => {
      this.isLoadingReactive$.next(true);
    }),
    switchMap(() => this.http.get('https://kodbazis.hu/api/cimek')),
    catchError((err) => of([])),
    tap((response) => {
      this.isLoadingReactive$.next(false);
      this.elemsReactive$.next(response as string[]);
      console.log('http: ', response);
    })
  );

  delete$ = new Subject().pipe(
    tap(() => {
      this.isLoadingReactive$.next(true);
    }),
    switchMap(index => this.http.delete(`https://kodbazis.hu/api/cimek/${index}`)),
    tap(() => {
      // @ts-ignore
      this.refresh$.next("");
    }
    )
  );

  create$ = new Subject().pipe(
    tap(() => {
      this.isLoadingReactive$.next(true);
    }),
    switchMap((input) => this.http.post(`https://kodbazis.hu/api/cimek`, { cim: input })),
    tap(() => {
      // @ts-ignore
      this.refresh$.next("");
    }
    )
  )

  subscriptions: Subscription[] = [];

  constructor(private anchor: ScrollingService, private http: HttpClient) {
  }

  scrollToAnchor(anchor: string) {
    const sectionElement = this.sections.find(sec => sec.nativeElement.getAttribute('data-anchor') === anchor)?.nativeElement;
    if (sectionElement) {
      this.anchor.scrollTo(sectionElement);
    } else {
      alert('No anchor provided for this button!')
    }
  }

  protected readonly Number = Number;

  // PROCEDURÁLIS
  ngOnInit() {
    this.getContent();
  }

  getContent() {
    this.isLoading = true;
    fetch('https://kodbazis.hu/api/cimek')
      .then(res => res)
      .then(data => {
        console.log(data);
        return data.json();
      })
      .then(content => {
        console.log(content);
        this.elems = content;
      })
      .catch(error => {
        console.error('Hiba történt:', error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  newElem(event: any) {
    event.preventDefault();
    console.log(event.target.elements.title.value);
    const newElem = event.target.elements.title.value;
    this.elems.push(newElem);
    event.target.reset();
  }

  newAPIElem(event: any) {
    event.preventDefault();
    this.isLoading = true;
    console.log(event.target.elements.title.value);
    const newElem = event.target.elements.title.value;
    fetch('https://kodbazis.hu/api/cimek', {
      method: 'POST',
      body: JSON.stringify({ cim: (newElem) })
    })
      .then(() => {
        this.getContent();
      });
    event.target.reset();
  }

  removeElem(index: number) {
    this.elems.splice(index, 1);
  }

  removeAPIelem(index: number) {
    this.isLoading = true;
    fetch('https://kodbazis.hu/api/cimek/' + index, { method: 'DELETE' })
      .then(() => {
        this.getContent();
      });
  }

  // REAKTÍV

  ngAfterViewInit() { // ngOnInit helyett
    const refreshSub = this.refresh$.subscribe();
    const deleteSub = this.delete$.subscribe();
    const createSub = this.create$.subscribe();
    this.subscriptions = [...this.subscriptions, refreshSub, deleteSub, createSub];
    // @ts-ignore
    this.refresh$.next();
  }

  removeElemReactive(index: number) {
    // @ts-ignore
    this.delete$.next(index);
  }

  newElemReactive(e: any) {
    e.preventDefault();
    const newValue = e.target.elements.title.value;
    // @ts-ignore
    this.create$.next(newValue);
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
