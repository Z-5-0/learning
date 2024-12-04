import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {animate, style, transition, trigger} from "@angular/animations";

interface Album {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface Photo {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  animations: [
    trigger('fadeOut', [
      transition(':enter', [
        style({opacity: 1, transform: 'translateY(0)'}),
        animate('3000ms ease-out', style({opacity: 1, transform: 'translateY(0)'})),
      ]),
      transition(':leave', [
        style({opacity: 1, transform: 'translateY(0)'}),
        animate('500ms ease-out', style({opacity: 0, transform: 'translateY(10px)'})),
      ]),
    ]),
  ],
})

export class ItemComponent {
  isDownloaded: boolean = false;
  albumID: number = 0;
  photos: any[] = [];

  constructor(private aRoute: ActivatedRoute, private route: Router) {
    aRoute.params.subscribe(params => {
      this.albumID = params['id'];
      fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${this.albumID}`)
        .then(res => res.json())
        .then((photos: Photo[]) => {
          if (!photos.length) {
            this.route.navigate(['..'], {relativeTo: aRoute});
          }
          this.photos = photos;
        })
    });
  }

  onFadeOutDone() {
    this.isDownloaded = false;
  }
}
