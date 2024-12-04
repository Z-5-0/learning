import { Component } from '@angular/core';
import { SubscriptionService } from 'src/shared/services/subscription.service';

@Component({
  selector: 'app-comp2',
  templateUrl: './comp2.component.html',
  styleUrls: ['./comp2.component.scss']
})
export class Comp2Component {
  onSubscribe() {
    let subService = new SubscriptionService();
    subService.onSubscribeClicked();
  }
}
