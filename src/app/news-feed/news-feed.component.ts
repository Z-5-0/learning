import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, Subject } from 'rxjs';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent {
  apiKey = 'pub_583593720d249420127076d9ef3a76bb9440f';
  apiUrl = `https://newsdata.io/api/1/latest`;

  http: HttpClient = inject(HttpClient);

  news$!: Observable<any[]>;

  constructor() {
    this.fetchNews();
  }

  fetchNews() {
    this.news$ = this.getNews().pipe(
      catchError(error => {
        console.error('Hiba történt a hírek lekérésekor:', error);
        return []; // Hiba esetén üres tömb visszaadása
      })
    );
  }

  refreshNews() {
    this.fetchNews(); // Gombnyomásra is új hívás
  }

  getNews(): Observable<any> {
    const params = {
      apikey: this.apiKey,
      language: 'hu'
    };

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(news => news.results) // Az API válaszból szűrjük le a kívánt adatokat
    );
  }
}

