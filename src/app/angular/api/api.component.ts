import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

interface Post {
  body: string,
  id: number,
  title: string,
  userId: number
}

@Component({
  selector: 'app-angular-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})

export class ApiAngularComponent {
  @Input() tempSwitcher: '' | 'api' | 'api2' = '';

  limit: number = 3;
  hasError: boolean = false;
  private apiUrl = `https://jsonplaceholder.typicode.com/posts`;

  posts: Post[] = [];

  fetchCompleted: boolean = false;
  fetchCompleted2: boolean = false;

  posts$: Observable<Post[]> = new Observable();

  

  constructor(private http: HttpClient) {
    this.refreshPosts();

    this.posts$ = this.fetchPosts().pipe(
      tap(() => {
        this.fetchCompleted2 = true;
      }),
      catchError((err) => {
        return throwError(() => new Error('Fetch failed'));
      })
    );
  }

  // API hívás, amely Observable-t ad vissza
  fetchPosts(): Observable<Post[]> { // Érdemes rest-api.service.ts-be elhelyezni 
    this.posts = [];
    const url = this.apiUrl + `?_limit=${this.limit}`;
    return this.hasError ? throwError(() => new Error('Error')) : this.http.get<Post[]>(url); // Az Observable közvetlenül visszatér
  }

  refreshPosts() {
    this.fetchCompleted = false;
    this.fetchPosts().subscribe({
      next: (val) => {
        this.posts = val;
      },
      error: (err) => {
        console.log(err);
        this.fetchCompleted = true;
        // this.posts = [err.message];
      },
      complete: () => {
        this.fetchCompleted = true;
      }
    });
  }
}
