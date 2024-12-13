import { AfterContentInit, Component, ComponentRef, ElementRef, inject, Inject, OnDestroy, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { ScrollingService } from "../../shared/services/scrolling.service";
import { MenuService } from "../../shared/services/menu.service";
import { UserService } from 'src/shared/services/user.service';
import { LoggerService } from 'src/shared/services/logger.service';
import { USER_TOKEN } from 'src/shared/shared.module';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.scss']
})
export class AngularComponent implements OnDestroy {
  protected readonly Object = Object;

  @ViewChildren(`
  angular,
  howitworks,
  files,
  components,
  modules,
  featuremodule,
  sharedmodule,
  creatingchildroutes,
  routesforfeaturemodule,
  creatingacoremodule,
  creatinganauthfeaturemodule,
  eagerloadingvslazyloading,
  implementinglazyloading,
  preloadinglazymodules,
  providingserviceinlazyloadedmodules,
  templateoperations,
  stringinterpolationops,
  ngifops,
  ngforops,
  ngcontainerops,
  ngcontentops,
  databinding,
  directives,
  ngfor,
  ngif,
  ngstyle,
  ngclass,
  propertybinding,
  inputbinding,
  outputbinding,
  componentcommunication,
  templatereference,
  domreference,
  componentreference,
  viewchild,
  viewchilddomref,
  viewchildcomponentref,
  viewchildren,
  contentchild,
  contentchildren,
  lifecycle,
  onchanges,
  ngoninit,
  docheck,
  aftercontentinit,
  aftercontentchecked,
  afterviewinit,
  afterviewichecked,
  ondestroy,
  customdirective,
  customdirectivecreation,
  customdirectiverenderer,
  propertybindingindirective,
  conditionalattributedirective,
  customclassdirective,
  customstyledirective,
  customstructuraldirective,
  hostlistener,
  eventbindingvshostlistener,
  hostbinding,
  propertyvshostbinging,
  ngswitch,
  viewencapsulation,
  service,
  servicecreateanduse,
  servicecomponentinteraction,
  dependencyinjection,
  hierarchicaldependencyinjection,
  injectingserviceintoservice,
  injectiontoken,
  observable,
  createanduseobservable,
  errorandcomplete,
  rxjs,
  ofandfrom,
  fromevent,
  mapandfilter,
  mapoperator,
  filteroperator,
  subjects,
  observablesvssubjects,
  behaviorsubject,
  replaysubject,
  asyncsubject,
  promisevsobservable,
  unsubscribefromobservable,
  signal,
  creatingandusingsignals,
  computedvalueandeffect,
  routingandguards,
  routerlink,
  activerouterlink,
  relativevsabsoluteroutepath,
  navigatingprogramatically,
  routeparameters,
  querystringinroute,
  fragmentinroute,
  childroutes,
  routemodule,
  authservice,
  routeguards,
  navigationevents,
  routedata,
  naviexample,
  pipes,
  custompipe,
  customfilterpipe,
  pureandimpurepipe,
  filteringwithoutpipe,
  pipeexample,
  asyncpipe,
  dynamiccomponents,
  dynamiccomponentsngif,
  dynamiccomponentsprogramatically,
  ajax,
  reactive,
  reactiveform,
  templatedrivenform,
  httpclient,
  httpclientpost,
  httpclientget,
  httpclientdelete,
  httpservice,
  httpclientput,
  httperror,
  catcherror,
  getsinglerecord,
  httpheaders,
  sendingquerystring,
  observableresponseandresponsetype,
  interceptors,
  realworldapi,
  httpclientexample,
  authentication,
  loginsignupform,
  createuserfromresponsedata,
  dinamicmenulinks,
  sendingtokenwithrequests,
  sendingtokenwithinterceptor,
  logout,
  autologin,
  autologout,
  canactivaterouterguard,
  authenticationexample,
  simpleapp,
  spa,
  unittest,
  jasminekarma,
  spy,
  testbed,
  testinghttpservice,
  componenttesting,
  dominteraction,
  asynchronoustest,
  promiseandobservable,
  testingpipes,
  testingdirectives,
  testingrouting,
  codecoverage,
  jasminejest,

  deploying,
  standalonecomponents,
  creatingstandalonecomponents,
  creatingstandalonedirective,
  standalonerootcomponent,
  servicesinstandalonecomponents,
  routingandlazyloadingwithstandalonecomponents
  `) sections!: QueryList<ElementRef>;

  anchorButtons: any[] = [
    { title: 'Angular', anchor: 'angular' },
    { title: 'How it works?', anchor: 'howitworks' },
    { title: 'Files/Folders', anchor: 'files' },
    { title: 'Components', anchor: 'components' },
    {
      title: 'Modules', anchor: 'modules', subtitles: [
        { title: 'Feature module', anchor: 'featuremodule' },
        { title: 'Shared module', anchor: 'sharedmodule' },
        { title: 'Creating child routes', anchor: 'creatingchildroutes' },
        { title: 'Routes for feature module', anchor: 'routesforfeaturemodule' },
        { title: 'Creating a core module', anchor: 'creatingacoremodule' },
        { title: 'Creating an auth feature module', anchor: 'creatinganauthfeaturemodule' },
        { title: 'Eager loading vs lazy loading', anchor: 'eagerloadingvslazyloading' },
        { title: 'Implementing lazy loading', anchor: 'implementinglazyloading' },
        { title: 'Pre-loading lazy loaded modules', anchor: 'preloadinglazymodules' },
        { title: 'Providing service in lazy loaded modules', anchor: 'providingserviceinlazyloadedmodules' },
      ]
    },
    {
      title: 'Template operations', anchor: 'templateoperations', subtitles: [
        { title: 'String interpolation', anchor: 'stringinterpolationops' },
        { title: 'ngIf', anchor: 'ngifops' },
        { title: 'ngFor', anchor: 'ngforops' },
        { title: 'ng-container', anchor: 'ngcontainerops' },
        { title: 'ng-content', anchor: 'ngcontentops' },
      ]
    },
    { title: 'Data binding', anchor: 'databinding' },
    {
      title: 'Directives', anchor: 'directives', subtitles: [
        { title: 'ngFor', anchor: 'ngfor' },
        { title: 'ngIf', anchor: 'ngif' },
        { title: 'ngStyle', anchor: 'ngstyle' },
        { title: 'ngClass', anchor: 'ngclass' }
      ]
    },
    {
      title: 'Property binding', anchor: 'propertybinding', subtitles: [
        { title: 'Input', anchor: 'inputbinding' },
        { title: 'Output', anchor: 'outputbinding' }
      ]
    },
    { title: 'Component communication', anchor: 'componentcommunication' },
    {
      title: 'Template reference', anchor: 'templatereference', subtitles: [
        { title: 'DOM', anchor: 'domreference' },
        { title: 'Component', anchor: 'componentreference' }
      ]
    },
    {
      title: 'ViewChild', anchor: 'viewchild', subtitles: [
        { title: 'DOM', anchor: 'viewchilddomref' },
        { title: 'Component', anchor: 'viewchildcomponentref' }
      ]
    },
    { title: 'ViewChildren', anchor: 'viewchildren' },
    { title: 'Content child', anchor: 'contentchild' },
    { title: 'Content children', anchor: 'contentchildren' },
    {
      title: 'Lifecycle', anchor: 'lifecycle', subtitles: [
        { title: 'OnChanges', anchor: 'onchanges' },
        { title: 'OnInit', anchor: 'ngoninit' },
        { title: 'DoCheck', anchor: 'docheck' },
        { title: 'AfterContentInit', anchor: 'aftercontentinit' },
        { title: 'AfterContentChecked', anchor: 'aftercontentchecked' },
        { title: 'AfterViewInit', anchor: 'afterviewinit' },
        { title: 'AfterViewChecked', anchor: 'afterviewichecked' },
        { title: 'OnDestroy', anchor: 'ondestroy' },
      ]
    },
    {
      title: 'Custom directive', anchor: 'customdirective', subtitles: [
        { title: 'Creation', anchor: 'customdirectivecreation' },
        { title: 'Renderer2', anchor: 'customdirectiverenderer' },
        { title: 'Property binding', anchor: 'propertybindingindirective' },
        { title: 'Conditional attribute directive', anchor: 'conditionalattributedirective' },
        { title: 'Custom class directive', anchor: 'customclassdirective' },
        { title: 'Custom style directive', anchor: 'customstyledirective' },
        { title: 'Custom structural directive', anchor: 'customstructuraldirective' }
      ]
    },
    {
      title: 'HostListener', anchor: 'hostlistener', subtitles: [
        { title: 'Event binding vs HostListener', anchor: 'eventbindingvshostlistener' }
      ]
    },
    {
      title: 'HostBinding', anchor: 'hostbinding', subtitles: [
        { title: 'Property binding vs HostBinding', anchor: 'propertyvshostbinging' }
      ]
    },
    { title: 'ngSwitch', anchor: 'ngswitch', subtitles: [] },
    { title: 'View encapsulation', anchor: 'viewencapsulation', subtitles: [] },
    {
      title: 'Service', anchor: 'service', subtitles: [
        { title: 'Create and use', anchor: 'servicecreateanduse' },
        { title: 'Component interaction', anchor: 'servicecomponentinteraction' },
      ]
    },
    {
      title: 'Dependency injection', anchor: 'dependencyinjection', subtitles: [
        { title: 'Hierarchical dependency injection', anchor: 'hierarchicaldependencyinjection' },
        { title: 'Injecting service into service', anchor: 'injectingserviceintoservice' },
        { title: 'Injection token', anchor: 'injectiontoken' }
      ]
    },
    {
      title: 'Observable', anchor: 'observable', subtitles: [
        { title: 'Create and use', anchor: 'createanduseobservable' },
        { title: 'Error and complete', anchor: 'errorandcomplete' }
      ]
    },
    {
      title: 'RxJS', anchor: 'rxjs', subtitles: [
        { title: 'Of and from', anchor: 'ofandfrom' },
        { title: 'FromEvent', anchor: 'fromevent' },
        { title: 'Map and filter', anchor: 'mapandfilter' },
        { title: 'Map', anchor: 'mapoperator' },
        { title: 'Filter', anchor: 'filteroperator' },
        { title: 'Subjects', anchor: 'subjects' },
        { title: 'Observables vs Subjects', anchor: 'observablesvssubjects' },
        { title: 'Behaviour Subject', anchor: 'behaviorsubject' },
        { title: 'Replay Subject', anchor: 'replaysubject' },
        { title: 'Async Subject', anchor: 'asyncsubject' },
        { title: 'Promise vs Observable', anchor: 'promisevsobservable' },
        { title: 'Unsubscribe from Observable', anchor: 'unsubscribefromobservable' },
      ]
    },
    {
      title: 'Signal', anchor: 'signal', subtitles: [
        { title: 'Creating and using signals', anchor: 'creatingandusingsignals' },
        { title: 'Computed value and effect', anchor: 'computedvalueandeffect' },
      ]
    },
    {
      title: 'Routing and guards', anchor: 'routingandguards', subtitles: [
        { title: 'routerLink', anchor: 'routerlink' },
        { title: 'activeRouterlink', anchor: 'activerouterlink' },
        { title: 'Relative vs absolute route path', anchor: 'relativevsabsoluteroutepath' },
        { title: 'Navigating programatically', anchor: 'navigatingprogramatically' },
        { title: 'Route parameters', anchor: 'routeparameters' },
        { title: 'Query string in route', anchor: 'querystringinroute' },
        { title: 'Fragment in route', anchor: 'fragmentinroute' },
        { title: 'Child routes', anchor: 'childroutes' },
        { title: 'Route module', anchor: 'routemodule' },
        { title: 'Auth service', anchor: 'authservice' },
        { title: 'Route guards', anchor: 'routeguards' },
        { title: 'Navigation events', anchor: 'navigationevents' },
        { title: 'Route data', anchor: 'routedata' },
        { title: 'Navigation example', anchor: 'naviexample' },
      ]
    },
    {
      title: 'Pipes', anchor: 'pipes', subtitles: [
        { title: 'Creating custom pipe', anchor: 'custompipe' },
        { title: 'Custom filter pipe', anchor: 'customfilterpipe' },
        { title: 'Pure and impure pipe', anchor: 'pureandimpurepipe' },
        { title: 'Filtering without pipe', anchor: 'filteringwithoutpipe' },
        { title: 'Async pipe', anchor: 'asyncpipe' },
        { title: 'Pipe example', anchor: 'pipeexample' },
      ]
    },
    {
      title: 'Dynamic components', anchor: 'dynamiccomponents', subtitles: [
        { title: 'ngIf', anchor: 'dynamiccomponentsngif' },
        { title: 'Programatically', anchor: 'dynamiccomponentsprogramatically' },
      ]
    },
    {
      title: 'HTTPClient', anchor: 'httpclient', subtitles: [
        { title: 'POST', anchor: 'httpclientpost' },
        { title: 'GET', anchor: 'httpclientget' },
        { title: 'DELETE', anchor: 'httpclientdelete' },
        { title: 'HTTP service', anchor: 'httpservice' },
        { title: 'PUT', anchor: 'httpclientput' },
        { title: 'HTTP error', anchor: 'httperror' },
        { title: 'CatchError', anchor: 'catcherror' },
        { title: 'GET single record', anchor: 'getsinglerecord' },
        { title: 'HTTP service', anchor: 'httpservice' },
        { title: 'HTTP header', anchor: 'httpheaders' },
        { title: 'Sending query string', anchor: 'sendingquerystring' },
        { title: 'Observable response and response type', anchor: 'observableresponseandresponsetype' },
        { title: 'Interceptors', anchor: 'interceptors' },
        { title: 'Real world API', anchor: 'realworldapi' },
        { title: 'Example', anchor: 'httpclientexample' },
      ]
    },
    {
      title: 'Authentication', anchor: 'authentication', subtitles: [
        { title: 'Login/Signup form', anchor: 'loginsignupform' },
        { title: 'Create user from response data', anchor: 'createuserfromresponsedata' },
        { title: 'Dynamic menu links', anchor: 'dinamicmenulinks' },
        { title: 'Sending token with requests', anchor: 'sendingtokenwithrequests' },
        { title: 'Sending token with interceptor', anchor: 'sendingtokenwithinterceptor' },
        { title: 'Logout', anchor: 'logout' },
        { title: 'Auto login', anchor: 'autologin' },
        { title: 'Auto logout', anchor: 'autologout' },
        { title: 'canActivate router guard', anchor: 'canactivaterouterguard' },
        { title: 'Example', anchor: 'authenticationexample' },
      ]
    },
    { title: 'AJAX', anchor: 'ajax' },
    { title: 'Reactive thinking', anchor: 'reactive' },
    { title: 'Reactive Form', anchor: 'reactiveform' },
    { title: 'Template Driven Form', anchor: 'templatedrivenform' },
    { title: 'Simple app', anchor: 'simpleapp' },
    { title: 'SPA', anchor: 'spa' },
    {
      title: 'Unit test', anchor: 'unittest', subtitles: [
        { title: 'Jasmine / Karma', anchor: 'jasminekarma' },
        { title: 'Spy', anchor: 'spy' },
        { title: 'TestBed', anchor: 'testbed' },
        { title: 'Testing HTTP service', anchor: 'testinghttpservice' },
        { title: 'Component', anchor: 'componenttesting' },
        { title: 'DOM interaction', anchor: 'dominteraction' },
        { title: 'Asynchronous test', anchor: 'asynchronoustest' },
        { title: 'Promise and Observable', anchor: 'promiseandobservable' },
        { title: 'Pipes', anchor: 'testingpipes' },
        { title: 'Directives', anchor: 'testingdirectives' },
        { title: 'Routing', anchor: 'testingrouting' },
        { title: 'Code coverage', anchor: 'codecoverage' },
        { title: 'Jasmine / Jest', anchor: 'jasminejest' },
      ]
    },
    {
      title: 'Deploying', anchor: 'deploying', subtitles: [
        { title: 'Environment variables', anchor: 'environmentvariables' },
        { title: 'Generate bundles for production', anchor: 'generatebundlesforproduction' }
      ]
    },
    {
      title: 'Standalone components', anchor: 'standalonecomponents', subtitles: [
        { title: 'Creating standalone components', anchor: 'creatingstandalonecomponents' },
        { title: 'Creating standalone directive', anchor: 'creatingstandalonedirective' },
        { title: 'Standalone root component', anchor: 'standalonerootcomponent' },
        { title: 'Services in standalone components', anchor: 'servicesinstandalonecomponents' },
        { title: 'Routing and lazy loading with standalone components', anchor: 'routingandlazyloadingwithstandalonecomponents' }
      ]
    },
  ];

  example: string = 'Ez csak egy példa';

  testToastIsVisible: boolean = false;

  personName: string = 'Ryan Smith';
  cartCounter: number = 0;

  changeToDarkerGreen: boolean = false;

  sampleStringArray: string[] = ['pin', 'shelf', 'club'];

  sampleCompexArray: any[] = [
    {
      id: 12,
      label: 'Hajabusa',
      type: 'motor',
      details: {
        colors: ['white', 'grey'],
        weight: 430
      },
      img: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/145875/hayabusa-right-front-three-quarter.jpeg?isig=0&q=80'
    },
    {
      id: 56,
      label: 'Punto 199',
      type: 'car',
      details: {
        colors: ['blue', 'orange', 'green', 'black', 'silver'],
        weight: 1100
      },
      img: 'https://e7.pngegg.com/pngimages/162/547/png-clipart-third-generation-fiat-punto-fiat-500-fiat-idea-fiat-punto-compact-car-building-thumbnail.png'
    },
    {
      id: 89,
      label: 'Astra GTC',
      type: 'car',
      details: {
        colors: ['white', 'black', 'red'],
        weight: 1600
      },
      img: 'https://w7.pngwing.com/pngs/95/269/png-transparent-vauxhall-motors-vauxhall-astra-opel-astra-opel-gtc-red-vauxhall-astra-vxr-car-compact-car-sedan-transport-thumbnail.png'
    },
    {
      id: 111,
      label: 'DS3 Racing',
      type: 'car',
      details: {
        colors: ['yellow', 'brown', 'black'],
        weight: 1150
      },
      img: 'https://ocdn.eu/pulscms-transforms/1/k58ktkpTURBXy82N2Q5ZDdjM2M1YmU3OWMwZjA5ODA4NzQzOWE2MTIwNi5qcGeRlQLNAugAwsM'
    },
    {
      id: 156,
      label: 'Hyosung',
      type: 'motor',
      details: {
        colors: ['blue', 'red'],
        weight: 1600
      },
      img: 'https://images5.1000ps.net/images_bikekat/2007/21-HYOSUNG/2296-GT_650_R/gr.jpg'
    },
    {
      id: 187,
      label: 'Veloster',
      type: 'car',
      details: {
        colors: ['orange', 'red', 'black'],
        weight: 1600
      },
      img: 'https://autocarpet.hu/img/49420/80000891/500x500/80000891.webp?time=1709910204'
    },
  ];
  sampleCompexArrayTypeLengths: { all: number, motor: number, car: number } = { all: 0, motor: 0, car: 0 };

  testElemIsVisible: boolean = false;
  testElemHasClass: boolean = false;

  selectedRadioButtonOutput: 'all' | 'motor' | 'car' = 'all';

  searchData: string = '';

  @ViewChild('vehicleComponent') vehicleComponentRef!: ComponentRef<any>;

  @ViewChildren('inputEl') inputElRef!: QueryList<ElementRef>
  fullNameFromQueryList: string = '';

  @ViewChild('sometext') someTextRef!: ElementRef;
  someTextWithViewChild: string = '';

  projectedContents: any[] = [];
  clearChildrenContentProjectionEvent: any;

  colorElemsComponentList: any;

  messageArray: string[] = ['hi there', 'see ya'];
  messageObject: any = {
    message1: 'egg',
    message2: 'potato',
    message3: 'onion'
  };
  messageObject2: any = {
    message1: 'bread',
    message2: 'carrot',
  };

  afterContentCheckedInputValue: string = '';

  childComponentIsDestroyed: boolean = true;
  numberOfChildComponentIsDestroyed: number = 0;

  hostListenerMouseEventCounter: any = { in: 0, out: 0 };

  textInputFocusCounter: number = 0;
  textInputFocusCounter2: number = 0;

  boxIsDisabled: boolean = true;

  backgroundColorToggler: boolean = false;

  displayCenterElem: boolean = false;

  switchTab: number = 0;

  newUserObj: any = { name: '', gender: '', subType: '', status: '' };

  messageLogArray: string[] = [];

  rxjsSubscriptionsCounter: number = 1;


  private _router: Router = inject(Router);
  private _activeRouter: ActivatedRoute = inject(ActivatedRoute);
  currentRoute: any = '';

  subscriptions: Subscription[] = [];

  constructor(private anchor: ScrollingService, public menuService: MenuService, @Inject(USER_TOKEN) private userService: UserService, private logger: LoggerService) {
    this.sampleCompexArrayTypeLengths.all = this.sampleCompexArray.length;
    this.sampleCompexArrayTypeLengths.motor = this.sampleCompexArray.filter(f => f.type === 'motor').length;
    this.sampleCompexArrayTypeLengths.car = this.sampleCompexArray.filter(f => f.type === 'car').length;

    this.logger.message$.subscribe(m => {
      if (m) {
        this.messageLogArray.push(m);
      }
    });

    let lastRoute = this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
    this.subscriptions = [...this.subscriptions, lastRoute];

    this._activeRouter.fragment.subscribe(id => {
      this.jumpToSection(id ?? '');
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

  onDataBindFromHTMLToClass() {
    this.testToastIsVisible = !this.testToastIsVisible;
  }

  onNameChange(e: any) {
    this.personName = e.target.value;
  }

  decreaseCartCounter() {
    this.cartCounter > 0 ? this.cartCounter-- : null;
  }

  increaseCartCounter() {
    this.cartCounter++;
  }

  getFullNameFromQueryList() {
    this.inputElRef.forEach(input => {
      this.fullNameFromQueryList += (' ' + input.nativeElement.value);
    })
  }

  getViewChildOfProjectedText() {
    this.someTextWithViewChild = this.someTextRef.nativeElement.innerText;
  }

  addElemToOnInitMessages(elem: string) {
    this.messageArray = [...this.messageArray, elem];
    // this.messageArray.push(elem);
    // this.messageArray = JSON.parse(JSON.stringify(this.messageArray));
  }

  addElemToOnInitObject(elem: string) {
    this.messageObject = { ...this.messageObject, ['message' + (Object.keys(this.messageObject).length + 1)]: elem };
  }

  addElemToDoCheckObject(elem: string) {
    this.messageObject2 = { ...this.messageObject2, ['message' + (Object.keys(this.messageObject2).length + 1)]: elem };
  }

  destroysIncreased() {
    this.numberOfChildComponentIsDestroyed++;
  }

  hostListenerMouseEvent(direction: string) {
    if (direction === 'in') {
      this.hostListenerMouseEventCounter.in++;
    }
    if (direction === 'out') {
      this.hostListenerMouseEventCounter.out++;
    }
  }

  increaseTextInputFocusNumber(e: any) {
    this.textInputFocusCounter++;
  }

  increaseTextInputFocusNumber2(e: any) {
    this.textInputFocusCounter2++;
  }

  createNewUser() {
    this.userService.addNewUser({ ...this.newUserObj })
  }

  testFunction(e: any) {
    this.rxjsSubscriptionsCounter = e;
  }

  navigateToContact() {
    this._router.navigate(['/', 'angular', 'contact']);
  }

  jumpToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach(sub => {
        sub.unsubscribe();
      })
    }
  }
}
