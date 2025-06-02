import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ScrollingService } from "../shared/services/scrolling.service";
import { MenuService } from "../shared/services/menu.service";
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { transform } from 'typescript';
import { DisableLoadingSevice } from 'src/shared/services/disable-loading.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimation', [
      transition('* => *', [
        group([
          query(':enter', [
            style({ opacity: 0, transform: 'translateX(-100%)' }),
          ], { optional: true }),
          query(':leave', [
            style({
              position: 'absolute',
              maxWidth: '100vw',
              maxHeight: '100vh',
              overflow: 'hidden',
              scale: 1
            }),
            animate('600ms ease-out', style({ opacity: 0, scale: '1', transform: 'translateX(100%)' }))
          ], { optional: true }),
          query(':enter', [
            animate('600ms ease-in', style({ opacity: 1, transform: 'translateX(0)' }))
          ], { optional: true })
        ])
      ], { params: { maxWidth: '100%', maxHeight: '100%' } }) // alapértelmezett értékek
    ])
  ],
  template: `
    <div class="page">
        <div *ngIf="pageIsLoading" class="loadingLayer">
          <div class="spinner-border text-light" role="status"></div>
        </div>
      <div class="menu">
        <button *ngFor="let menu of menus"
            [routerLink]="[menu.link]"
            [routerLinkActive]="'active'"
            class="btn btn-{{menu.buttonClass}}"
            [disabled]="menu.disabled">
          {{ menu.label }}
        </button>
      </div>

      <div class="dropdow-menu">
        <div #menuDropdown class="dropdown-toggle dropdown-menu-icon" type="button"
             data-bs-toggle="dropdown" aria-expanded="false"
             (click)="menuIsOpened = !menuIsOpened">
          <div #lines *ngFor="let line of [1, 2 ,3]" class="line" [ngClass]="{'opened': menuIsOpened}"></div>
        </div>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li *ngFor="let menu of menus">
            <a [routerLink]="menu.link" class="dropdown-item" [ngClass]="{'disabled': menu.disabled}">
              {{ menu.label }}
            </a>
          </li>
        </ul>
      </div>

      <div #content id="content" class="content row">
        <div #innerContent
            [@routeAnimation]="{ value: url, params: { maxWidth: contentWidth, maxHeight: contentHeight } }"
            (@routeAnimation.start)="start($event)"
            (@routeAnimation.done)="done($event)"
            class="col-12 col-xxl-8 mx-auto">
          <router-outlet #outlet (activate)="onActivate($event)" (deactivate)="onDeactivate($event)"></router-outlet>
        </div>
        <div class="scroll-to-bottom" (click)="scrollToBottom(bottom)">
          <span></span>
        </div>
        <div class="scroll-to-top" (click)="scrollToTop(outlet)">
          <span></span>
        </div>
        <div #bottom></div>
      </div>
    </div>
  `
})

export class AppComponent {
  @ViewChild('menuDropdown') menuDropdown!: ElementRef;
  @ViewChild('lines') lines!: ElementRef;
  menus: any[] = [
    { label: 'Javascript', link: 'js', buttonClass: 'warning', disabled: false },
    { label: 'Typescript', link: 'typescript', buttonClass: 'warning', disabled: false },
    { label: 'jQuery', link: 'jquery', buttonClass: 'secondary', disabled: true },
    { label: 'Regex', link: 'regex', buttonClass: 'secondary', disabled: true },
    { label: 'Extras', link: 'extras', buttonClass: 'warning', disabled: false },
    { label: 'JSON', link: 'json', buttonClass: 'warning', disabled: false },
    { label: 'XML', link: 'xml', buttonClass: 'warning', disabled: false },
    { label: 'Angular', link: 'angular', buttonClass: 'warning', disabled: false },
    { label: 'React', link: 'react', buttonClass: 'warning', disabled: false },
    { label: 'Vue', link: 'vue', buttonClass: 'secondary', disabled: true },
    { label: 'Ionic', link: 'ionic', buttonClass: 'secondary', disabled: true },
    { label: 'RxJS', link: 'rxjs', buttonClass: 'warning', disabled: false },
    { label: 'Redux', link: 'redux', buttonClass: 'secondary', disabled: true },
    { label: 'Lodash', link: 'lodash', buttonClass: 'secondary', disabled: true },
    { label: 'CSS/SCSS', link: 'cssscss', buttonClass: 'warning', disabled: false },
    { label: 'PrimeNG', link: 'primeng', buttonClass: 'secondary', disabled: true },
    { label: 'Material', link: 'material', buttonClass: 'warning', disabled: false },
    { label: 'Bootstrap', link: 'bootstrap', buttonClass: 'warning', disabled: false },
    { label: 'Tailwind', link: 'tailwind', buttonClass: 'secondary', disabled: true },
    { label: 'Ant Design', link: 'antdesign', buttonClass: 'secondary', disabled: true },
    { label: 'Leaflet', link: 'leaflet', buttonClass: 'secondary', disabled: true },
    { label: 'AGM', link: 'agm', buttonClass: 'secondary', disabled: true },
    { label: 'Webpack', link: 'webpack', buttonClass: 'warning', disabled: false },
    { label: 'Grunt', link: 'grunt', buttonClass: 'secondary', disabled: true },
    { label: 'Gulp', link: 'gulp', buttonClass: 'secondary', disabled: true },
    { label: 'SSR', link: 'ssr', buttonClass: 'warning', disabled: false },
    { label: 'SEO', link: 'seo', buttonClass: 'warning', disabled: false },
    { label: 'API', link: 'api', buttonClass: 'warning', disabled: false },
    { label: 'Database', link: 'database', buttonClass: 'warning', disabled: false },
    { label: 'Dart', link: 'dart', buttonClass: 'secondary', disabled: true },
    { label: 'FontAwesome', link: 'fontawesome', buttonClass: 'secondary', disabled: true },
    { label: 'VS Code', link: 'vscode', buttonClass: 'warning', disabled: false },
    { label: 'News feed', link: 'newsfeed', buttonClass: 'warning', disabled: false }
  ];

  later: any[] = [

  ];

  clickOutsideListener: any;

  menuIsOpened: boolean = false;
  menuClickOutSideIsWorking: boolean = true;

  protected url = '';
  contentWidth: string = '100%';
  contentHeight: string = '100%';

  constructor(private scroll: ScrollingService,
    private renderer: Renderer2,
    private menuService: MenuService,
    private router: Router,
    private viewportScroller: ViewportScroller,
    private disableLoading: DisableLoadingSevice) {
    this.menuService.onStateChange().subscribe(state => {
      if (state) {
        this.activateClickOutsideListener();
      } else {
        this.clickOutsideListener();
        setTimeout(() => {
          this.activateClickOutsideListener();
        }, 15000);
      }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.pageIsLoading = true;
      }
      if (event instanceof NavigationEnd) {
        this.url = event.url;
        // this.pageIsLoading = false;
      }
    });

    this.disableLoading.disableEvent.subscribe(event => {
      this.pageIsLoading = false;
    })
  }

  @ViewChild('innerContent', { static: true }) contentRef!: ElementRef;

  pageIsLoading: boolean = false;

  start(event: any) {
    const fromStateArray = event.fromState.split('/').filter((f: any) => f);
    const toStateArray = event.toState.split('/').filter((f: any) => f);

    const toState = event.toState;
    const fromState = event.fromState;

    if (fromState.includes('#') || toState.includes('#')) {
      return;
    }

    for (const f of fromStateArray) {
      if (toStateArray.includes(f)) {
        return;
      }
    }

    const content = document.getElementById('content');
    content?.scrollTo(0, 0);
  }

  done(event: any) {
    this.pageIsLoading = false;
  }

  onActivate(event: any) {
    // const content = document.getElementById('content');
    // content?.scrollTo(0, 0);
    this.pageIsLoading = true;
  }

  onDeactivate(event: any) {
    // const content = document.getElementById('content');
    // content?.scrollTo(0, 0);
    // console.log('onDeactivate');
  }

  scrollToBottom(target: HTMLElement) {
    this.scroll.scrollTo(target);
  }

  scrollToTop(target: HTMLElement) {
    this.scroll.scrollTo(target);
  }

  activateClickOutsideListener() {
    this.clickOutsideListener = this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target !== this.menuDropdown.nativeElement && this.menuIsOpened) {
        this.menuIsOpened = false;
      }
    });
  }
}
