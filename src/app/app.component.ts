import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ScrollingService } from "../shared/services/scrolling.service";
import { MenuService } from "../shared/services/menu.service";
import { NavigationEnd, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <div class="page">
      <div class="menu">
        <button *ngFor="let menu of menus" [routerLink]="[menu.link]" class="btn btn-{{menu.buttonClass}}" [disabled]="menu.disabled">
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

      <div id="content" class="content row">
        <div class="col-12 col-xxl-8 mx-auto">
          <router-outlet #outlet (activate)="onActivate($event)"></router-outlet>
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
    { label: 'Extras', link: 'extras', buttonClass: 'warning', disabled: false },
    { label: 'JSON', link: 'json', buttonClass: 'warning', disabled: false },
    { label: 'XML', link: 'xml', buttonClass: 'warning', disabled: false },
    { label: 'Angular', link: 'angular', buttonClass: 'warning', disabled: false },
    { label: 'React', link: 'react', buttonClass: 'warning', disabled: false },
    { label: 'Vue', link: 'vue', buttonClass: 'secondary', disabled: true },
    { label: 'Ionic', link: 'ionic', buttonClass: 'secondary', disabled: true },
    { label: 'RxJS', link: 'rxjs', buttonClass: 'warning', disabled: false },
    { label: 'Redux', link: 'redux', buttonClass: 'secondary', disabled: true },
    { label: 'CSS/SCSS', link: 'cssscss', buttonClass: 'warning', disabled: false },
    { label: 'Material', link: 'material', buttonClass: 'warning', disabled: false },
    { label: 'Bootstrap', link: 'bootstrap', buttonClass: 'warning', disabled: false },
    { label: 'Tailwind', link: 'tailwind', buttonClass: 'secondary', disabled: true }, 
    { label: 'Webpack', link: 'webpack', buttonClass: 'warning', disabled: false },
    { label: 'Grunt', link: 'grunt', buttonClass: 'secondary', disabled: true },
    { label: 'Gulp', link: 'gulp', buttonClass: 'secondary', disabled: true },
    { label: 'SSR', link: 'ssr', buttonClass: 'warning', disabled: false },
    { label: 'SEO', link: 'seo', buttonClass: 'warning', disabled: false },
    { label: 'Lodash', link: 'lodash', buttonClass: 'secondary', disabled: true },
    { label: 'API', link: 'api', buttonClass: 'warning', disabled: false },
    { label: 'Database', link: 'database', buttonClass: 'warning', disabled: false },
    { label: 'Dart', link: 'dart', buttonClass: 'secondary', disabled: true },
    { label: 'VS Code', link: 'vscode', buttonClass: 'warning', disabled: false },
    { label: 'News feed', link: 'newsfeed', buttonClass: 'warning', disabled: false }
  ];

  later: any[] = [

  ];

  clickOutsideListener: any;

  menuIsOpened: boolean = false;
  menuClickOutSideIsWorking: boolean = true;

  constructor(private scroll: ScrollingService,
    private renderer: Renderer2,
    private menuService: MenuService,
    private router: Router,
    private viewportScroller: ViewportScroller) {
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
  }

  onActivate(event: any) {
    const content = document.getElementById('content');
    content?.scrollTo(0, 0);

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
