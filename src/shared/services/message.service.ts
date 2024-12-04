import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class MessageService {
    private messageSubject = new ReplaySubject<string>(Infinity, 5000);

    get messages$() {
        return this.messageSubject.asObservable();
    }

    addMessage(message: string) {
        this.messageSubject.next(message);
    }
}