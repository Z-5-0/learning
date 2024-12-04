import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class SubscriptionService {
    onSubscribeClicked() {
        alert('clicked');
    }
}