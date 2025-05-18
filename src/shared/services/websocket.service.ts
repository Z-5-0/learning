import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    private socket$: WebSocketSubject<any>;

    constructor() {
        this.socket$ = webSocket('wss://ws.postman-echo.com/raw');
        // this.socket$ = webSocket('ws://localhost:3000');
        /* this.socket$ = webSocket({
            url: 'ws://localhost:3000',
            deserializer: e => {
                if (e.data instanceof Blob) {      // ha Blob típusú, akkor olvassuk ki a szöveget
                    console.warn('Blob fogadva - Nem támogatott formátum!');
                    // return '[BLOB DATA]';
                }

                try {
                    return JSON.parse(e.data);
                } catch (err) {
                    return e.data; // ha nem JSON, hagyjuk szövegként
                }
            },
            serializer: value => JSON.stringify(value) // küldés JSON-ként
        }); */
    }

    sendMessage(message: any) {     // üzenetküldés a szervernek
        this.socket$.next(message);
    }

    getMessages(): Observable<any> {        // szerver felől érkező üzenet fogadása
        return this.socket$.asObservable();
    }

    closeConnection() {     // WebSocket kapcsolat bezárása
        this.socket$.complete();
    }
}