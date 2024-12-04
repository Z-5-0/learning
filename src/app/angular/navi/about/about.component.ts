import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AboutDetailsService } from 'src/shared/services/about-details.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  typeSwitcher: 'default' | 'test-outlet' | 'navi-outlet' | 'secondary-outlet' = 'default';
  private _activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private _router: Router = inject(Router);
  aboutDetailsService: AboutDetailsService = inject(AboutDetailsService);

  aboutData: any[] = [];

  searchString: string = '';
  searchLoading: boolean = false;

  constructor() {
    this.typeSwitcher = this._activeRoute.snapshot.data['typeSwitcher'] || 'default';

    // this.searchString = this._activeRoute.snapshot.queryParams['search'];
    this.searchString = this._activeRoute.snapshot.queryParamMap.get('search') ?? '';

    /* this._activeRoute.queryParams.subscribe((data) => { // depricated !
      this.searchString = data['search'] ?? '';
    }); */

    this._activeRoute.queryParamMap.subscribe((data) => {
      this.searchLoading = true;
      this.searchString = data.get('search') ?? '';

      if (this.searchString === undefined || this.searchString === '') {
        this.aboutDetailsService.getAllDetails().subscribe((details) => { // típus meghatározás: (details: Details[])
          this.aboutData = details.map(detail => {
            return { id: detail.id, label: detail.title };
          });
          this.searchLoading = false;
        });
      } else {
        this.aboutDetailsService.getAllDetails().subscribe(details => {
          this.aboutData = details
            .map(data => ({ id: data.id, label: data.title }))
            .filter(data => data.label.toLowerCase().includes(this.searchString.toLowerCase()));
          this.searchLoading = false;
        });
      }
    });
  }

  onFilterChange() {
    this.searchLoading = true;
    this._router.navigate(['.'], { relativeTo: this._activeRoute, queryParams: { search: this.searchString } });
  }
}
