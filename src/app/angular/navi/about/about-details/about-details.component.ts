import { Component, DoCheck, inject, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AboutDetailsService } from 'src/shared/services/about-details.service';

@Component({
  selector: 'app-about-details',
  templateUrl: './about-details.component.html',
  styleUrls: ['./about-details.component.scss']
})
export class AboutDetailsComponent implements OnInit, OnDestroy {
  private _router: Router = inject(Router);
  private _activeRouter: ActivatedRoute = inject(ActivatedRoute);
  aboutDetailsService: AboutDetailsService = inject(AboutDetailsService);

  id: number = 0;
  aboutData: any = {};
  dataFromRoute: any;

  paramMapObs: Subscription | null = null;

  constructor() {
    // this.id = this._activeRouter.snapshot.params['id']; // régebbi megoldás
    // this.id = +(this._activeRouter.snapshot.paramMap.get('id') ?? 0);
    /* this._activeRouter.params.subscribe((data) => {
      this.id = +data['id']; // data.id --> Property 'id' comes from an index signature, so it must be accessed with ['id']
      this.aboutData = this.aboutDetailsService.aboutDetailsArray.find(data => data.id === this.id) ?? 0;
    }); */
    this.paramMapObs = this._activeRouter.paramMap.subscribe(data => {
      this.id = +(data.get('id') ?? 0);
      this.aboutData = this.aboutDetailsService.aboutDetailsArray.find(data => data.id === this.id) ?? 0;
      this.dataFromRoute = this._router.getCurrentNavigation()?.extras.state || { id: this.aboutData.id, label: this.aboutData.title };
    });

    // console.log('details constructor')
  }
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.paramMapObs?.unsubscribe();
  }
}
