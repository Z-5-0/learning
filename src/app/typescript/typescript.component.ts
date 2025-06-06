import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ajax } from "rxjs/ajax";
import { forkJoin, map, Observable, of, switchMap, tap } from "rxjs";
import { ScrollingService } from "../../shared/services/scrolling.service";

interface Album {
  userID: number,
  id: number,
  title: string,
  photos: Photo[],
}

interface Photo {
  id: number,
  title: string,
  url: string,
  thumbnailUrl: string,
}

@Component({
  selector: 'app-typescript',
  templateUrl: './typescript.component.html',
  styleUrls: ['./typescript.component.scss']
})

export class TypescriptComponent implements OnInit {
  @ViewChildren(`
      ts,
      typeinterface,
      union,
      literal,
      array,
      tuple,
      object,
      generictype,
      genericfunctions,
      genericclasses,
      genericinterface,
      typeassertion,
      promiseandasync,
      optionalchaining,
      typescriptandrxjs,
      promisevsobservable,
      albumswithpromise,
      albumswithobservable
      `) sections!: QueryList<ElementRef>;

  anchorButtons: any[] = [
    { title: 'TypeScript', anchor: 'ts', subtitles: [] },
    { title: 'Type inference', anchor: 'typeinterface', subtitles: [] },
    { title: 'Union type', anchor: 'union', subtitles: [] },
    { title: 'Literal type', anchor: 'literal', subtitles: [] },
    { title: 'Array', anchor: 'array', subtitles: [] },
    { title: 'Tuple', anchor: 'tuple', subtitles: [] },
    { title: 'Object', anchor: 'object', subtitles: [] },
    { title: 'Generic type', anchor: 'generictype', subtitles: [] },
    { title: 'Generic functions', anchor: 'genericfunctions', subtitles: [] },
    { title: 'Generic classes', anchor: 'genericclasses', subtitles: [] },
    { title: 'Generic interface', anchor: 'genericinterface', subtitles: [] },
    { title: 'Type assertion', anchor: 'typeassertion', subtitles: [] },
    { title: 'Promise & Async', anchor: 'promiseandasync', subtitles: [] },
    { title: 'Optional chaining', anchor: 'optionalchaining', subtitles: [] },
    { title: 'TypeScript & RxJS', anchor: 'typescriptandrxjs', subtitles: [] },
    { title: 'Promise vs Observable', anchor: 'promisevsobservable', subtitles: [] },
    { title: 'Albums by Promise', anchor: 'albumswithpromise', subtitles: [] },
    { title: 'Albums by Observable', anchor: 'albumswithobservable', subtitles: [] },
  ];

  albums: Album[] = [];
  albumsAlter: Album[] = [];

  albums$: Observable<any> = new Observable<any>();

  constructor(private anchor: ScrollingService) {
  }

  ngOnInit() {
    this.PromiseSolution();
    this.ObservableSolution();
  }

  async PromiseSolution() {
    this.albums = await this.getAlbums();
    this.albumsAlter = await this.getAlbumsAlter();
    console.log('albums: ', this.albums);
    console.log('albumsAlter: ', this.albumsAlter);
    this.rendererFromPromise(this.albums, false);
    this.rendererFromPromise(this.albumsAlter, true);
  }

  async getAlbums(): Promise<Album[]> {
    const allAlbums = await fetch('https://jsonplaceholder.typicode.com/albums')
      .then(response => {
        return response.json() as Promise<Album[]>; // A response-ból json() függvénnyel szedhető ki a JSON adat.
        // return <Promise<Album[]>>response.json(); // Mindkettő type assertion
      })
      .then(albums => { // Az albums már tudja, hogy albumok tömbjével tudunk majd visszatérni.
        return albums.slice(0, 5).map(async album => {
          // album.photos = await fetch(`https://jsonplaceholder.typicode.com/photos/?albumId=${album.id}`).then(photo => photo.json() as Promise<Photo[]>);
          album.photos = await fetch(`https://jsonplaceholder.typicode.com/photos/?albumId=${album.id}`).then(async photo => {
            const photos = await photo.json();
            return photos.map((p: Album) => {
              return { ...p, thumbnailUrl: `https://placehold.co/50x50/3d90d7/212121?text=${p.id}` }
            }) as Promise<Photo[]>
          });
          return album;
        });
      })
      .then(arrayAlbums => {
        console.log('arrayAlbums: ', arrayAlbums)
        return arrayAlbums;
      });

    return await Promise.all(allAlbums); // Megőrzi a sorrendet, tehát az indexek is maradnak.
  }

  async getAlbumsAlter() {
    const fetchedAlbums = await fetch('https://jsonplaceholder.typicode.com/albums').then((albums) => {
      return albums.json() as Promise<Album[]>
    });

    const albums = fetchedAlbums.slice(0, 5);

    const promisesOfAllPhotos = albums.map((album) =>
      fetch('https://jsonplaceholder.typicode.com/photos/?albumId=' + album.id)
        .then((photos) => photos.json() as Promise<Photo[]>)
    )

    const allPhotos = await Promise.all(promisesOfAllPhotos); // Típusa egy tömb, amiben fotók tömbje sorakozik.

    console.log(allPhotos);

    return albums.map((album, i) => ({
      ...album, photos: allPhotos[i].map((p: any) => {
        return { ...p, thumbnailUrl: `https://placehold.co/50x50/9d2626/212121?text=${p.id}` };
      })
    }));
  }

  rendererFromPromise(albums: Album[], alter: boolean = false) {
    const albumContainer = document.getElementById(alter ? 'renderedAlterAlbums' : 'renderedAlbums');

    if (!albumContainer) { // Narrowing technika
      return;
    }

    albumContainer.innerHTML = `
        ${albums.map(album => `
            <div>
                <div>
                    <span>#${album.id}</h4>
                    <span>${album.title}</span>
                </div>

                <div class="d-flex flex-wrap gap-1">
                  ${album.photos?.map((photo: any) => `
                    <img src="${photo.thumbnailUrl}">
                  `).join('')}
                </div>
                </br>
            </div>
        `).join('')}
    `;
  }

  ObservableSolution() {
    this.albums$ = ajax('https://jsonplaceholder.typicode.com/albums').pipe(
      map(response => (response.response as Album[]).splice(0, 5)),   // a lenti map az itteni splice-szal egyenértékű
      // map(reduce => reduce.splice(0, 5));
      switchMap(albums => forkJoin([    // switchMap-pel összekapcsoljuk az egyes Observable folyamatokat (ajax), a ForkJoin operátor pedig csak akkor fut le, ha minden fotó lekérdezésre került.
        of(albums),   // olyan observable lesz belőle, ami azonnal kibocsát adatcsomagot successful állapotban
        ...albums.map((album, index) => ajax(`https://jsonplaceholder.typicode.com/photos/?albumId=${album.id}`).pipe(
          tap(p => console.log(`Album ${index}: `, p)),
          map(response => <Photo[]>response.response)
        ))
      ])),
      map(([albums, ...allAlbums]) => {
        console.log('allPhotos: ', allAlbums);
        return albums.map((album, index) => ({
          ...album, photos: allAlbums[index].map(p => {
            return { ...p, thumbnailUrl: `https://placehold.co/50x50/ffc107/212121?text=${p.id}` }
          })
        }))
      })
    );

    this.albums$.subscribe(data => {
      console.log('Obserable eredménye: ', data);
      this.rendererFromObservable(data);
    })
  }

  rendererFromObservable(albums: Album[]) {
    const albumContainer = document.getElementById('renderedAlbumsWithObservable');

    if (!albumContainer) { // narrowing technika
      return;
    }

    albumContainer.innerHTML = `
        ${albums.map(album => `
            <div>
                <div>
                    <span>#${album.id}</h4>
                    <span>${album.title}</span>
                </div>

                <div class="d-flex flex-wrap gap-1">
                  ${album.photos?.map(photo => `
                  <img src="${photo.thumbnailUrl}">
                  `).join('')}
                  </br>
                </div>
            </div>
        `).join('')}
    `;
  }

  scrollToAnchor(anchor: string) {
    const sectionElement = this.sections.find(sec => sec.nativeElement.getAttribute('data-anchor') === anchor)?.nativeElement;
    if (sectionElement) {
      this.anchor.scrollTo(sectionElement);
    } else {
      alert('No anchor provided for this button!')
    }
  }
}

