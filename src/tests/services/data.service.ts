import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  http: HttpClient = inject(HttpClient);

  constructor() { }

  getAllUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  getUserByID(id: number) {
    return this.http.get(`https://jsonplaceholder.typicode.com/users/${id}`);
  }

  updateUser(id: number, user: any) {
    return this.http.put(`https://jsonplaceholder.typicode.com/users/${id}`, user);
  }
}
