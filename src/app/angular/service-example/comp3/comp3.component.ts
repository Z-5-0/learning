import { Component } from '@angular/core';
import { SubscriptionService } from 'src/shared/services/subscription.service';

@Component({
  selector: 'app-comp3',
  templateUrl: './comp3.component.html',
  styleUrls: ['./comp3.component.scss']
})
export class Comp3Component {
  onSubscribe() {
    let subService = new SubscriptionService();
    subService.onSubscribeClicked();
  }
}
