import { Component } from '@angular/core';
import { SubscriptionService } from 'src/shared/services/subscription.service';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.scss']
})
export class Comp1Component {
  constructor(private subscription: SubscriptionService) {
  }

  onSubscribe() {
    this.subscription.onSubscribeClicked();
  }
}
