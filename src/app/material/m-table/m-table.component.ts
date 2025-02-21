import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop'
import { SelectionModel } from '@angular/cdk/collections';
import { debounceTime, Subject } from 'rxjs';

interface Movie {
  position: number,
  title: string,
  year: number,
  genre: string,
  rating: number,
  plot: string
}

@Component({
  selector: 'app-m-table',
  templateUrl: './m-table.component.html',
  styleUrls: ['./m-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class MTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTable) table1!: MatTable<Movie>;

  lessMovies: Movie[] = [
    { position: 1, title: 'Inception', year: 2010, genre: 'Sci-Fi', rating: 8.8, plot: 'A csapat tudatos álmokban próbál információt ellopni.' },
    { position: 2, title: 'The Dark Knight', year: 2008, genre: 'Action', rating: 9.0, plot: 'Batman szembeszáll Jokerrel Gotham megmentéséért.' },
    { position: 3, title: 'Interstellar', year: 2014, genre: 'Sci-Fi', rating: 8.6, plot: 'Űrhajósok galaxisokon át utaznak a Föld megmentéséért.' },
  ];

  movies: Movie[] = [
    { position: 1, title: 'Inception', year: 2010, genre: 'Sci-Fi', rating: 8.8, plot: 'A csapat tudatos álmokban próbál információt ellopni.' },
    { position: 2, title: 'The Dark Knight', year: 2008, genre: 'Action', rating: 9.0, plot: 'Batman szembeszáll Jokerrel Gotham megmentéséért.' },
    { position: 3, title: 'Interstellar', year: 2014, genre: 'Sci-Fi', rating: 8.6, plot: 'Űrhajósok galaxisokon át utaznak a Föld megmentéséért.' },
    { position: 4, title: 'Pulp Fiction', year: 1994, genre: 'Crime', rating: 8.9, plot: 'Kereszteződő történetek egy bűnözői világban.' },
    { position: 5, title: 'The Matrix', year: 1999, genre: 'Sci-Fi', rating: 8.7, plot: 'Egy hacker felfedezi a világ valóságának illúzióját.' },
    { position: 6, title: 'Forrest Gump', year: 1994, genre: 'Drama', rating: 8.8, plot: 'Egy különleges férfi életét meséli el, aki történelmet formál.' },
    { position: 7, title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001, genre: 'Fantasy', rating: 8.8, plot: 'Egy hobbit útra kel, hogy elpusztítson egy gonosz gyűrűt.' },
    { position: 8, title: 'The Lord of the Rings: The Two Towers', year: 2002, genre: 'Fantasy', rating: 8.7, plot: 'A szövetség szembeszáll Szauron seregeivel.' },
    { position: 9, title: 'The Lord of the Rings: The Return of the King', year: 2003, genre: 'Fantasy', rating: 9.0, plot: 'A végső csata Szauron ellen.' },
    { position: 10, title: 'The Shawshank Redemption', year: 1994, genre: 'Drama', rating: 9.3, plot: 'Egy ártatlanul elítélt férfi barátságra talál és reményt kap a börtönben.' },
    { position: 11, title: 'The Godfather', year: 1972, genre: 'Crime', rating: 9.2, plot: 'A maffiacsalád vezetése generációról generációra száll.' },
    { position: 12, title: 'The Godfather: Part II', year: 1974, genre: 'Crime', rating: 9.0, plot: 'A Corleone család múltja és jelene összefonódik.' },
    { position: 13, title: 'The Silence of the Lambs', year: 1991, genre: 'Thriller', rating: 8.6, plot: 'Egy fiatal ügynök segítséget kér egy sorozatgyilkostól másik gyilkos elfogásához.' },
    { position: 14, title: 'Fight Club', year: 1999, genre: 'Drama', rating: 8.8, plot: 'Egy férfi és egy rejtélyes barát alvilági klubot alapít.' },
    { position: 15, title: 'Gladiator', year: 2000, genre: 'Action', rating: 8.5, plot: 'Egy római tábornok bosszút áll, miután árulás miatt rabszolgává válik.' },
    { position: 16, title: 'The Green Mile', year: 1999, genre: 'Drama', rating: 8.6, plot: 'Egy elítélt ember természetfeletti képességei megváltoztatják az őrök életét.' },
    { position: 17, title: 'Schindler’s List', year: 1993, genre: 'Biography', rating: 8.9, plot: 'Egy iparos több száz zsidót ment meg a holokauszt alatt.' },
    { position: 18, title: 'Se7en', year: 1995, genre: 'Thriller', rating: 8.6, plot: 'Két detektív egy sorozatgyilkos nyomában, aki a hét főbűn alapján öl.' },
    { position: 19, title: 'Braveheart', year: 1995, genre: 'Drama', rating: 8.3, plot: 'Egy skót szabadságharcos vezetése alatt felkelés indul az angol uralom ellen.' },
    { position: 20, title: 'Avatar', year: 2009, genre: 'Sci-Fi', rating: 7.8, plot: 'Egy idegen bolygón zajló konfliktus közepette egy ember új életet kezd.' }
  ];

  newStaticMovieAdded: boolean = false;

  tableAllColumns: string[] = ['position', 'title', 'year', 'genre', 'rating'];
  table2DisplayedColumns: string[] = ['position', 'title', 'rating'];

  table2SelectedRows: number[] = [];
  table2SelectedMovieTitles: string[] = [];

  columnsToDisplayWithExpand = [...this.tableAllColumns, 'expand']; // lemásoljuk a tableAllColumns tömböt, és hozzáadunk egy expand nevű oszlopot
  expandedElement!: Movie | null;

  lessMoviesSource = new MatTableDataSource(this.lessMovies);

  columns = [
    { name: 'position', header: 'Position', cell: (element: Movie) => `${element.position}` },
    { name: 'title', header: 'Title', cell: (element: Movie) => `${element.title}` },
    { name: 'year', header: 'Year', cell: (element: Movie) => `${element.year}` },
    { name: 'genre', header: 'Genre', cell: (element: Movie) => `${element.genre}` },
    { name: 'rating', header: 'Rating', cell: (element: Movie) => `${element.rating}` },
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  moviesDataSource!: MatTableDataSource<Movie>; // for paginator

  moviesSource = new MatTableDataSource(this.movies);

  selection = new SelectionModel<Movie>(true, []);

  ngOnInit(): void {
    /* this.moviesSource.filterPredicate = (data: any, filter: string) => {
      return data.year.toString().includes(filter);
    }; */

    this.moviesDataSource = new MatTableDataSource(this.movies);
  }

  ngAfterViewInit(): void {
    this.moviesDataSource.paginator = this.paginator;
    this.moviesDataSource.sort = this.sort;
  }

  addNewMovie() {
    const newColumn = {
      position: this.movies.length + 1,
      title: 'New movie',
      year: 2000,
      genre: 'Comedy',
      rating: 5.0,
      plot: 'Totally new plot'
    };
    this.movies.push(newColumn);
    this.table1.renderRows();
    this.newStaticMovieAdded = true;
    // this.movies = [...this.movies]; // deep copy-val is frissül a tábla
  }

  removeNewMovie() {
    this.movies.pop();
    this.table1.renderRows();
    this.newStaticMovieAdded = false;
  }

  onColumnVisibilityChange(name: string, position: number, event: any) {
    this.table2DisplayedColumns.includes(name) ? this.table2DisplayedColumns = this.table2DisplayedColumns.filter(col => col !== name) : this.table2DisplayedColumns.splice(position, 0, name);
    this.table2DisplayedColumns = [...this.table2DisplayedColumns];
  }

  onRowClick(row: any) {
    this.table2SelectedRows.includes(row.position) ? this.table2SelectedRows.splice(this.table2SelectedRows.indexOf(row.position), 1) : this.table2SelectedRows.push(row.position);
    this.table2SelectedRows = [...this.table2SelectedRows];
    this.table2SelectedMovieTitles = [];
    this.table2SelectedRows.map(pos => {
      this.table2SelectedMovieTitles.push(this.movies.find(mov => mov.position === pos)?.title ?? '');
    });
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.moviesSource.filter = filterValue.trim().toLowerCase();
  }

  setfilterPredicate(event: any, filters: string[] = ['position', 'title', 'year', 'genre', 'rating']) {
    this.moviesSource.filterPredicate = (data: any, filter: string) => {
      console.log('data: ', data);
      return filters.some(key => {
        console.log(key);
        return data[key].toString().trim().toLowerCase().includes(filter);
      });
    };
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tableAllColumns, event.previousIndex, event.currentIndex);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.lessMoviesSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.lessMoviesSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Movie): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
