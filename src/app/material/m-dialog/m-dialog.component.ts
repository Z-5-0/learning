import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MPopupComponent } from './m-popup/m-popup.component';

export interface Movie {
  position: string;
  title: string;
  year: number;
  genre: string;
  rating: null;
  plot: string
}

@Component({
  selector: 'app-m-dialog',
  templateUrl: './m-dialog.component.html',
  styleUrls: ['./m-dialog.component.scss']
})
export class MDialogComponent {
  lessMovies: any[] = [
    { position: 1, title: 'Inception', year: 2010, genre: 'Sci-Fi', rating: 8.8, plot: 'A csapat tudatos álmokban próbál információt ellopni.' },
    { position: 2, title: 'The Dark Knight', year: 2008, genre: 'Action', rating: 9.0, plot: 'Batman szembeszáll Jokerrel Gotham megmentéséért.' },
    { position: 3, title: 'Interstellar', year: 2014, genre: 'Sci-Fi', rating: 8.6, plot: 'Űrhajósok galaxisokon át utaznak a Föld megmentéséért.' },
  ];

  constructor(public dialog: MatDialog) {

  }

  openDialog(row: Movie = {} as Movie): void {
    const dialogRef = this.dialog.open(MPopupComponent, {
      height: '90%',
      width: '50%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        new: Object.keys(row).length === 0 ? true : false,
        label: Object.keys(row).length === 0 ? 'New movie' : 'Edit movie',
        row
        // row: JSON.parse(JSON.stringify(row)) // így lehetne másolatot készíteni a filmek tömbjéről
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('afterClosed result: ', result);
      if (result?.new) {
        this.lessMovies = [...this.lessMovies, result.row];
      }
    });
  }
}
