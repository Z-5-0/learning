import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class DisableLoadingSevice {
    disableEvent: Subject<any> = new Subject<any>;

    doEvent() {
        this.disableEvent.next(null);
    }
}