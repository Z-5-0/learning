import { Component, ElementRef, QueryList, ViewChildren, OnInit, AfterViewInit, OnDestroy, afterRender, ViewChild } from '@angular/core';
import { ScrollingService } from "../../shared/services/scrolling.service";
import { BehaviorSubject, catchError, of, Subject, Subscription, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { KeyValue } from '@angular/common';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Route, Router } from '@angular/router';

interface Hero {
  name: string;
  origin: string;
  specialAbility: string;
  strength: number
}


@Component({
  selector: 'app-extras',
  templateUrl: './extras.component.html',
  styleUrls: ['./extras.component.scss'],
  animations: [
    trigger('querystagger', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'scale(0.7)' }),
          stagger(100, [
            animate('200ms ease-in', style({ opacity: 1, transform: 'scale(1)' }))
          ])
        ], { optional: true }),
        query(':leave', [
          style({ opacity: 1, transform: 'scale(1)' }),
          stagger(-100, [
            animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.7)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ExtrasComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(`
    scrollpositionrestoration,
    dependencyinjection,
    modulewithrouting,
    functioninputoutputtypes,
    ngiffunctioncall,
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
    mutablevsimmutable,
    arrayobjectdestructuring,
    consolecoloring,
    nullishcoalescing,
    nullishcoalescingvsor,
    voidtype,
    asyncawait,
    generictype,
    packagejsonscripts,
    importexport,
    functiondeclarations,
    functioninputs,
    nameconventionsandcases,
    anonymousobject,
    emptytype,
    jsonfunctions,
    angularpipes,
    valuevsreference,
    implementsvsextends,
    oopexpressions,
    ngmodel,
    anonymousentities,
    stylepreprocessoroptions,
    jsmethods,
    ngrx,
    svgsprite,
    importantsites,
    accessibilityattributes,
    arialabel,
    ariahidden,
    ariaexpanded,
    ariarole,
    arialive,
    ariadescribedby,
    ariachecked,
    ariaselected,
    ariainvalid,
    cdn,
    es6,
    elementref,
    injectable,
    tabindex,
    angularversions,
    designpatterns,
    cicd,
    devops,
    eventhandling,
    salting,
    bindings,
    gettersetter,
    corserror,
    recursion,
    typeguard,
    typepredicate,
    unknown,
    templateusage,
    sorting,
    keyvalue,
    valueorder,
    trackby,
    newdirectives,
    callbackfunction,
    fontsizes,
    handlingimages,
    routerinrouter,
    lineheight1,
    host,
    visibilitytracking,
    navigationevent,
    httperrors,

    // todo
    `) sections!: QueryList<ElementRef>;

  anchorButtons: any[] = [
    { title: 'scrollPositionRestoration', anchor: 'scrollpositionrestoration', subtitles: [] },
    { title: 'Dependency injection', anchor: 'dependencyinjection', subtitles: [] },
    { title: 'Module with routing', anchor: 'modulewithrouting', subtitles: [] },
    { title: 'Function input-output types', anchor: 'functioninputoutputtypes', subtitles: [] },
    { title: 'ngIf function call', anchor: 'ngiffunctioncall', subtitles: [] },
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
    { title: 'Mutable vs immutable type', anchor: 'mutablevsimmutable', subtitles: [] },
    {
      title: 'Array/Object destructuring', anchor: 'arrayobjectdestructuring', subtitles: [
        { title: 'Array destructuring', anchor: 'arraydestructuring' },
        { title: 'Object destructuring', anchor: 'objectdestructuring' }
      ]
    },
    { title: 'Console coloring', anchor: 'consolecoloring', subtitles: [] },
    {
      title: 'Nullish coalescing', anchor: 'nullishcoalescing', subtitles: [
        { title: 'Nullish coalescing vs OR', anchor: 'nullishcoalescingvsor' },

      ]
    },
    { title: 'Void type', anchor: 'voidtype', subtitles: [] },
    { title: 'Async/Await', anchor: 'asyncawait', subtitles: [] },
    { title: 'Generic type', anchor: 'generictype', subtitles: [] },
    { title: 'package.json scripts', anchor: 'packagejsonscripts', subtitles: [] },
    { title: 'import/export', anchor: 'importexport', subtitles: [] },
    { title: 'Optional chaining operator', anchor: 'optionalchainingoperator', subtitles: [] },
    { title: 'Function declarations', anchor: 'functiondeclarations', subtitles: [] },
    { title: 'Function inputs', anchor: 'functioninputs', subtitles: [] },
    { title: 'Name conventions and cases', anchor: 'nameconventionsandcases', subtitles: [] },
    { title: 'Anonymous object', anchor: 'anonymousobject', subtitles: [] },
    { title: 'Empty type', anchor: 'emptytype', subtitles: [] },
    { title: 'JSON functions', anchor: 'jsonfunctions', subtitles: [] },
    { title: 'Angular pipes', anchor: 'angularpipes', subtitles: [] },
    { title: 'Value vs reference', anchor: 'valuevsreference', subtitles: [] },
    { title: 'Implements vs extends', anchor: 'implementsvsextends', subtitles: [] },
    { title: 'OOP expressions', anchor: 'oopexpressions', subtitles: [] },
    { title: 'ngModel', anchor: 'ngmodel', subtitles: [] },
    { title: 'Anonymous entities', anchor: 'anonymousentities', subtitles: [] },
    { title: 'stylePreprocessorOptions', anchor: 'stylepreprocessoroptions', subtitles: [] },
    { title: 'Javascript methods', anchor: 'jsmethods', subtitles: [] },
    { title: 'NgRx', anchor: 'ngrx', subtitles: [] },
    { title: 'SVG sprite', anchor: 'svgsprite', subtitles: [] },
    { title: 'Important sites', anchor: 'importantsites', subtitles: [] },
    {
      title: 'Accessibility attributes', anchor: 'accessibilityattributes', subtitles: [
        { title: 'aria-label', anchor: 'arialabel' },
        { title: 'aria-hidden', anchor: 'ariahidden' },
        { title: 'aria-expanded', anchor: 'ariaexpanded' },
        { title: 'aria-controls', anchor: 'ariacontrols' },
        { title: 'aria-role', anchor: 'ariarole' },
        { title: 'aria-live', anchor: 'arialive' },
        { title: 'aria-describedby', anchor: 'ariadescribedby' },
        { title: 'aria-checked', anchor: 'ariachecked' },
        { title: 'aria-selected', anchor: 'ariaselected' },
        { title: 'aria-invalid', anchor: 'ariainvalid' },
      ]
    },
    { title: 'CDN', anchor: 'CDN', subtitles: [] },
    { title: 'ES6', anchor: 'es6', subtitles: [] },
    { title: 'ElementRef', anchor: 'elementref', subtitles: [] },
    { title: '@Injectable', anchor: 'injectable', subtitles: [] },
    { title: 'tabindex', anchor: 'tabindex', subtitles: [] },
    { title: 'Angular versions', anchor: 'angularversions', subtitles: [] },
    { title: 'Design patterns', anchor: 'designpatterns', subtitles: [] },
    { title: 'CI/CD pipeline', anchor: 'cicd', subtitles: [] },
    { title: 'DevOps', anchor: 'devops', subtitles: [] },
    { title: 'Event handling', anchor: 'eventhandling', subtitles: [] },
    { title: 'Salting', anchor: 'salting', subtitles: [] },
    { title: 'Bindings', anchor: 'bindings', subtitles: [] },
    { title: 'Getter / Setter', anchor: 'gettersetter', subtitles: [] },
    { title: 'CORS error', anchor: 'corserror', subtitles: [] },
    { title: 'Recursion', anchor: 'recursion', subtitles: [] },
    {
      title: 'Type guard', anchor: 'typeguard', subtitles: [
        { title: 'Template usage', anchor: 'templateusage' },
        { title: 'Type predicate', anchor: 'typepredicate' },
        { title: 'Unknown', anchor: 'unknown' }
      ]
    },
    {
      title: 'Sorting', anchor: 'sorting', subtitles: [
        { title: 'keyvalue', anchor: 'keyvalue' },
        { title: 'valueOrder', anchor: 'valueorder' },
      ]
    },
    { title: 'trackBy', anchor: 'trackby', subtitles: [] },
    { title: 'New directives', anchor: 'newdirectives', subtitles: [] },
    { title: 'Callback function', anchor: 'callbackfunction', subtitles: [] },
    { title: 'Font sizes', anchor: 'fontsizes', subtitles: [] },
    { title: 'Router in router', anchor: 'routerinrouter', subtitles: [] },
    { title: 'line-height: 1', anchor: 'lineheight1', subtitles: [] },
    { title: ':host', anchor: 'host', subtitles: [] },
    { title: 'Visibility tracking', anchor: 'visibilitytracking', subtitles: [] },
    { title: 'Navigation event', anchor: 'navigationevent', subtitles: [] },
    { title: 'HTTP errors', anchor: 'httperrors', subtitles: [] },

    // { title: 'TODO', anchor: 'todo', subtitles: [] },
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
      // console.log('http: ', response);
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

  valueOrder = (a: KeyValue<string, any>, b: KeyValue<string, any>): number => {
    return b.value.strength - a.value.strength; // Csökkenő sorrendben rendezzük az erősség szerint
  };

  /* 
    valueOrder = (a: KeyValue<string, any>, b: KeyValue<string, any>): number => {
      return a.value.name.localeCompare(b.value.name); // ABC sorrend
    };
  */

  /*
    superHeroesObj = this.superHeroes.reduce((acc, hero, index) => {
      acc[index] = hero;
      return acc;
    }, {} as { [key: number]: Hero });
  */

  superHeroes: { [key: string]: Hero } = {
    superman: {
      name: "Superman",
      origin: "Kryptonian",
      specialAbility: "Super strength, flight, heat vision",
      strength: 10
    },
    spiderman: {
      name: "Spider-Man",
      origin: "Earth (New York)",
      specialAbility: "Spider senses, web-shooting, wall-crawling",
      strength: 7
    },
    wonderwoman: {
      name: "Wonder Woman",
      origin: "Amazonian",
      specialAbility: "Super strength, combat skills, lasso of truth",
      strength: 9
    },
    ironman: {
      name: "Iron Man",
      origin: "Earth (USA)",
      specialAbility: "Powered armor, genius-level intellect",
      strength: 8
    },
    thor: {
      name: "Thor",
      origin: "Asgardian",
      specialAbility: "Control of thunder, flight (via Mjolnir)",
      strength: 10
    },
    flash: {
      name: "Flash",
      origin: "Earth (Central City)",
      specialAbility: "Super speed, time travel",
      strength: 7
    },
    hulk: {
      name: "Hulk",
      origin: "Earth (USA)",
      specialAbility: "Incredible strength, healing factor",
      strength: 10
    }
  };

  superHeroesArray: Hero[] = [
    {
      name: "Superman",
      origin: "Kryptonian",
      specialAbility: "Super strength, flight, heat vision",
      strength: 10
    },
    {
      name: "Spider-Man",
      origin: "Earth (New York)",
      specialAbility: "Spider senses, web-shooting, wall-crawling",
      strength: 7
    },
    {
      name: "Wonder Woman",
      origin: "Amazonian",
      specialAbility: "Super strength, combat skills, lasso of truth",
      strength: 9
    },
    {
      name: "Iron Man",
      origin: "Earth (USA)",
      specialAbility: "Powered armor, genius-level intellect",
      strength: 8
    },
    {
      name: "Thor",
      origin: "Asgardian",
      specialAbility: "Control of thunder, flight (via Mjolnir)",
      strength: 10
    },
    {
      name: "Flash",
      origin: "Earth (Central City)",
      specialAbility: "Super speed, time travel",
      strength: 7
    },
    {
      name: "Hulk",
      origin: "Earth (USA)",
      specialAbility: "Incredible strength, healing factor",
      strength: 10
    }
  ];

  testArray = [
    { number: 1, name: 'First' },
    { number: 2, name: 'Second' },
    { number: 3, name: 'Third' },
  ];

  @ViewChild('visibilityObservedElement') visibilityObservedElement!: ElementRef;
  observedElementIsVisible!: boolean;

  @ViewChildren('visibilityObservedElements') visibilityObservedElements!: QueryList<ElementRef>;
  observedElementsVisibility: boolean[] = [];

  constructor(private anchor: ScrollingService, private http: HttpClient, private activeRoute: ActivatedRoute) {
    /* afterRender(() => {
      if (this.activeRoute.snapshot.queryParamMap.get('jump') === 'routetransition') {
        this.scrollToAnchor('routetransition');
      }
    }); */
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
        // console.log(data);
        return data.json();
      })
      .then(content => {
        // console.log(content);
        this.elems = content;
      })
      .catch(error => {
        // console.error('Hiba történt:', error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  newElem(event: any) {
    event.preventDefault();
    // console.log(event.target.elements.title.value);
    const newElem = event.target.elements.title.value;
    this.elems.push(newElem);
    event.target.reset();
  }

  newAPIElem(event: any) {
    event.preventDefault();
    this.isLoading = true;
    // console.log(event.target.elements.title.value);
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

    const observer = new IntersectionObserver(([entry]) => {
      this.observedElementIsVisible = entry.isIntersecting
    }, { threshold: 0.2 });

    observer.observe(this.visibilityObservedElement.nativeElement);

    const elements = this.visibilityObservedElements.toArray(); // az Angular ElementRef listát tömbbé alakítjuk
    const observers = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const realIndex = elements.findIndex(el => el.nativeElement === entry.target);

        // console.log(realIndex, `Elem látható: ${entry.isIntersecting}`, entry.target); // entry.target: HTMLElement

        this.observedElementsVisibility[realIndex] = entry.isIntersecting;
      });
    }, { threshold: 0.2 });

    this.visibilityObservedElements.forEach(element => observers.observe(element.nativeElement)); // az összes figyelt elem hozzáadása
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

  valueOrderFunction(a: KeyValue<string, Hero>, b: KeyValue<string, Hero>): number {
    return a.value.name.localeCompare(b.value.name);
  }

  addToTestArray() {
    this.testArray = [...this.testArray,
    { number: 4, name: 'Fourth' },
    { number: 5, name: 'Fifth' },
    { number: 6, name: 'Sixth' }
    ];
  }

  removeFromTestArray() {
    this.testArray = this.testArray.slice(0, 3);
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
