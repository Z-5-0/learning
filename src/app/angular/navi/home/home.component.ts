import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @Input() tempSwitcher: '' | 'http' = '';

  router: Router = inject(Router);
  activeRouter: ActivatedRoute = inject(ActivatedRoute);

  queryString: string = '';


  search(val: string) {
    this.router.navigate(['about'], { relativeTo: this.activeRouter, queryParams: { search: val } });
  }
}
