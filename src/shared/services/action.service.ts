import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ActionService {
    value: boolean = false;

    changeAction() {
        this.value = !this.value;

        return (this.value ? 'Start again' : 'Done');
    }
}