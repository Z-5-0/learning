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
        <button *ngFor="let menu of menus" [routerLink]="[menu.link]" class="btn btn-warning">{{ menu.label }}</button>
      </div>

      <div class="dropdow-menu">
        <div #menuDropdown class="dropdown-toggle dropdown-menu-icon" type="button"
             data-bs-toggle="dropdown" aria-expanded="false"
             (click)="menuIsOpened = !menuIsOpened">
          <div #lines *ngFor="let line of [1, 2 ,3]" class="line" [ngClass]="{'opened': menuIsOpened}"></div>
        </div>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li *ngFor="let menu of menus">
            <a [routerLink]="menu.link" class="dropdown-item">{{ menu.label }}</a>
          </li>
        </ul>
      </div>

      <div id="content" class="content">
        <router-outlet #outlet (activate)="onActivate($event, outlet)"></router-outlet>
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
    { label: 'Javascript', link: 'js' },
    { label: 'Typescript', link: 'typescript' },
    { label: 'Angular', link: 'angular' },
    { label: 'Angular+', link: 'angularplus' },
    { label: 'React', link: 'react' },
    { label: 'RxJS', link: 'rxjs' },
    { label: 'NgRX', link: 'ngrx' },
    { label: 'CSS/SCSS', link: 'cssscss' },
    { label: '_lodash', link: 'lodash' },
    { label: 'SSR', link: 'ssr' },
    { label: 'Material', link: 'material' },
    { label: 'Bootstrap', link: 'bootstrap' },
    { label: 'Webpack', link: 'webpack' },
    { label: 'Grunt', link: 'grunt' },
    { label: 'Babel', link: 'babel' },
    { label: 'JSON', link: 'json' },
    { label: 'XML', link: 'xml' },
    { label: 'Ionic', link: 'ionic' },
    { label: 'SEO', link: 'seo' },
    { label: 'API', link: 'api' },
    { label: 'Database', link: 'database' },
    { label: 'Git', link: 'git' },
    { label: 'VS Code', link: 'vscode' },
    { label: 'News feed', link: 'newsfeed' },
  ]

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

  onActivate(event: any, outlet: any) {
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
