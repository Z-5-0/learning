import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

interface TagInterface {
    id: number;
    name: string;
}

@Injectable()

export class ApiService {
    httpClient: HttpClient = inject(HttpClient);
    apiUrl: string = 'http://localhost:3004';

    getTags(): Observable<TagInterface[]> {
        return this.httpClient.get<TagInterface[]>(`${this.apiUrl}/tags`);
    }

    createTag(name: string): Observable<TagInterface> {
        return this.httpClient.post<TagInterface>(`${this.apiUrl}/tags`, { name });
    }
}