import { EventEmitter, Output } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

export class LoggerService {
    private messageSubject: Subject<string> = new Subject<string>();

    get message$(): Observable<string> {
        return this.messageSubject.asObservable();
    }

    logMessage(name: string, status: string) {
        const message = `A new user with name ${name} with status ${status} is added to user list`;
        this.logMessageEvent(message);
    }

    private logMessageEvent(message: string) {
        this.messageSubject.next(message);
    }
}