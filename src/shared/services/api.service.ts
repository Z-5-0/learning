import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { inject, Injectable, OnInit } from "@angular/core";
import { Task } from "../models/Task";
import { BehaviorSubject, catchError, exhaustMap, map, Observable, of, Subject, take, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { LoggingService } from "./logging.service";
import { AuthFirebaseService } from "./auth-firebase.service";

interface ApiState {
    isLoading: boolean;
    error?: number;
    success?: boolean;
}

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    private firebaseURL = environment.firebaseURL;

    private _http: HttpClient = inject(HttpClient);
    private _loggingService: LoggingService = inject(LoggingService);

    private taskSubject = new BehaviorSubject<Task>({} as Task); // tárolja az aktuális adatot, elkülönítve a szerviz belső logikáját
    task$ = this.taskSubject.asObservable(); // Observable, amire fel lehet iratkozni a komponens

    private tasksSubject = new BehaviorSubject<Task[]>([]); // tárolja az aktuális adatokat, elkülönítve a szerviz belső logikáját
    tasks$ = this.tasksSubject.asObservable(); // Observable, amire fel lehet iratkozni a komponens

    private apiStateSubject = new BehaviorSubject<ApiState>({ isLoading: false });
    apiState$ = this.apiStateSubject.asObservable();

    private _authFirebaseService: AuthFirebaseService = inject(AuthFirebaseService);

    getTasks() {
        this._http.get<{ [key: string]: Task }>(`${this.firebaseURL}.json`)
            .pipe(
                map(data => this.transformFirebaseData(data)),
                catchError((error) => this.errorHandler(error)) // megfogja a hibát az Observable láncban
            )
            .subscribe({
                next: (val) => {
                    this.tasksSubject.next(val);
                    this.apiStateSubject.next({
                        isLoading: false,
                        success: true
                    });
                },
                error: (err) => this.statusHandler(err) // a throwError által visszaadott Observable itt érhető el
            });
    }

    getTask(id: string | undefined) {
        let headers = new HttpHeaders();
        headers = headers.set('content-type', 'application/json'); // új példány
        headers = headers.set('access-control-allow-origin', '*'); // új példány

        let params = new HttpParams();
        params = params.set('page', 2);
        params = params.set('item', 10);

        this._http.get(`${this.firebaseURL}/${id}.json`, { headers, params })
            .pipe(
                catchError((error) => this.errorHandler(error)) // megfogja a hibát az Observable láncban
            )
            .subscribe({
                next: (val) => this.taskSubject.next(val as Task),
                error: (err) => this.statusHandler(err) // a throwError által visszaadott Observable itt érhető el
            });
    }

    createTask(task: Task) {
        const headers = new HttpHeaders(
            { 'My-Header': 'hi-there' }
        );
        this._http.post<{ name: string }>(`${this.firebaseURL}.json`, task, { headers })
            .pipe(
                catchError((error) => this.errorHandler(error)) // megfogja a hibát az Observable láncban
            )
            .subscribe({
                next: (val) => this.getTasks(), // hibamentesség esetén frissítjük a task listát
                error: (err) => this.statusHandler(err) // a throwError által visszaadott Observable itt érhető el
            });
    }

    deleteTask(id: string | undefined) { // szükséges az undefined, mert a Task classban az id optional parameter
        this._http.delete(`${this.firebaseURL}/${id}.json`)
            .pipe(
                catchError((error) => this.errorHandler(error)) // megfogja a hibát az Observable láncban
            )
            .subscribe({
                next: (val) => this.getTasks(), // hibamentesség esetén frissítjük a task listát
                error: (err) => this.statusHandler(err) // a throwError által visszaadott Observable itt érhető el
            });
    }

    deleteAllSelectedTask(selectedTasks: string[]) {
        const updates: { [key: string]: null } = {};
        selectedTasks.forEach(id => updates[id] = null);

        return this._http.patch(`${this.firebaseURL}.json`, updates)
            .pipe(
                catchError((error) => this.errorHandler(error)) // megfogja a hibát az Observable láncban
            )
            .subscribe({
                next: (val) => this.getTasks(), // hibamentesség esetén frissítjük a task listát
                error: (err) => this.statusHandler(err) // a throwError által visszaadott Observable itt érhető el
            });
    }

    updataTask(data: Task) {
        const { id } = data; // objektum destruktorálás
        return this._http.put(`${this.firebaseURL}/${id}.json`, data)
            .pipe(
                catchError((error) => this.errorHandler(error)) // megfogja a hibát az Observable láncban
            )
            .subscribe({
                next: (val) => this.getTasks(), // hibamentesség esetén frissítjük a task listát
                error: (err) => this.statusHandler(err) // a throwError által visszaadott Observable itt érhető el
            });
    }

    transformFirebaseData(data: { [key: string]: Task }) {
        if (!data) {
            return []; // Ha nincs adat, üres tömb
        };
        let transformedData: any[] = [];
        Object.entries(data).forEach(([key, task]) => {
            transformedData.push({ ...task, id: key }); // {id: ''} felülírása id: key-vel
        });
        return transformedData;
    }

    private errorHandler(error: HttpErrorResponse) { // csak ebben az osztályban érhető el
        this._loggingService.logError({ // logging service által a Firebase log kollekciójába ír
            statusCode: error.status,
            errorMessage: error.message,
            dataTime: new Date
        });
        return throwError(() => error); // Observable-t adunk vissza
    }

    private statusHandler(error: HttpErrorResponse) {
        this.apiStateSubject.next({
            isLoading: false,
            error: error.status,
            success: error.ok
        });
    }
}

