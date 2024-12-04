import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class TaskService {
    // createTask: EventEmitter<string> = new EventEmitter<string>();
    createTask: Subject<string> = new Subject<string>(); // () --> a Subject class konstruktorát hívjuk meg

    onCreateTask(taskName: string) {
        // this.createTask.emit(taskName);
        this.createTask.next(taskName);
    }
}