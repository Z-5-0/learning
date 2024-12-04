import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class LoggingService {
    private firebaseLogURL = environment.firebaseLogURL;
    private _http: HttpClient = inject(HttpClient);

    logError(error: { statusCode: number, errorMessage: string, dataTime: Date }) {
        this._http.post(`${this.firebaseLogURL}`, error).subscribe();
    }

    fetchError() {
        this._http.get(`${this.firebaseLogURL}`).subscribe({
            next: (val) => {
                console.log(val);
            }
        });
    }
}