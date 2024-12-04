import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Observable, Observer, ReplaySubject, Subject, Subscription, timer, interval } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { MessageService } from 'src/shared/services/message.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit, OnDestroy {
  @Input() tempSwitcher: '' | 'observable' | 'observable2' | 'subject' | 'subject2' | 'behaviorSubject' | 'replaySubject' | 'replaySubject2' | 'replaySubject3' | 'asyncSubject' | 'promisevsobservable' | 'promisevsobservable2' | 'unsubscribe' = '';

  obs = new Observable((observer: Observer<number>) => {
    observer.next(Math.floor(Math.random() * (100 - 0 + 1) + 0));
  });
  observer1: number = 0;
  observer2: number = 0;

  subject: Subject<number> = new Subject<number>();
  sub1: number = 0;
  sub2: number = 0;
  subscriptions: Subscription[] = [];

  ajaxStatuses: string[] = [];

  behaviorSubject: BehaviorSubject<string> = new BehaviorSubject<string>('Initial data');
  behaviorStatuses: any = {};

  replaySubject: ReplaySubject<any> = new ReplaySubject<any>();
  replayStatuses: any = {};

  replaySubject2: ReplaySubject<any> = new ReplaySubject<any>(2);
  replayStatuses2: any = {};

  replaySubjectMessages: string[] = [];
  newReplaySubjectMessage = '';
  replaySubjectSubscriptionIsDone: boolean = false;
  replaySubjectSubscription: Subscription | null = null;
  messageService: MessageService = inject(MessageService);

  asyncSubject: AsyncSubject<any> = new AsyncSubject<any>();
  asyncSubValue: any = '';
  asyncSubValue2: any = '';

  promiseCalledText: string = '';
  observableCalledText: string = '';

  promiseGetText: string[] = [];
  observableGetText: string[] = [];

  promise: Promise<any> = new Promise<any>((resolve, reject) => {
    this.promiseCalledText = 'Promise is called';
    resolve('Promise data 1');
    resolve('Promise data 2');
    resolve('Promise data 3');
  });

  observable: Observable<any> = new Observable<any>((sub) => {
    this.observableCalledText = 'Observable is called';
    sub.next('Observable data 1');
    sub.next('Observable data 2');
    sub.next('Observable data 3');
  });

  counter = interval(1000);
  counterValues1: any[] = [];
  counterValues2: any[] = [];
  counterSubscription1: Subscription | null = null;
  counterSubscription2: Subscription | null = null;

  ngOnInit(): void {
  }

  onSubscribeObservable() {
    this.obs.subscribe({ // Subscriber 1
      next: (val) => {
        this.observer1 = val;
      },
      error: (err) => { },
      complete: () => { },
    });

    this.obs.subscribe({ // Subscriber 2
      next: (val) => {
        this.observer2 = val;
      },
      error: (err) => { },
      complete: () => { },
    });
  }

  onSubscribeSubject() { // Subscriber 1
    let subscriber1 = this.subject.subscribe({
      next: (val) => {
        this.sub1 = val;
      },
      error: (err) => { },
      complete: () => { },
    });

    let subscriber2 = this.subject.subscribe({ // Subscriber 2
      next: (val) => {
        this.sub2 = val;
      },
      error: (err) => { },
      complete: () => { },
    });

    this.subscriptions = [...this.subscriptions, subscriber1];
    this.subscriptions = [...this.subscriptions, subscriber2];


    this.subject.next(Math.floor(Math.random() * (100 - 0 + 1) + 0));
  }

  onAjaxCallWith3Subscribers() {
    this.ajaxStatuses = [];
    const userData = ajax('https://randomuser.me/api/') // GET metódus, mert nem speifikáltuk a metódust

    userData.subscribe({
      next: (res) => {
        this.ajaxStatuses.push('AJAX call 1 status code: ' + res.status + ' (UserName: ' + (res.response as any).results[0].name.first + ' ' + (res.response as any).results[0].name.last + ')');
      }
    });
    userData.subscribe({
      next: (res) => {
        this.ajaxStatuses.push('AJAX call 2 status code: ' + res.status + ' (UserName: ' + (res.response as any).results[0].name.first + ' ' + (res.response as any).results[0].name.last + ')');
      }
    });
    userData.subscribe({
      next: (res) => {
        this.ajaxStatuses.push('AJAX call 3 status code: ' + res.status + ' (UserName: ' + (res.response as any).results[0].name.first + ' ' + (res.response as any).results[0].name.last + ')');
      }
    });
  }

  onAjaxCallWith3Subscribers2() {
    this.ajaxStatuses = [];
    const apiSubject: Subject<AjaxResponse<any>> = new Subject<AjaxResponse<any>>();
    const userData = ajax('https://randomuser.me/api/') // GET metódus, mert nem speifikáltuk a metódust

    apiSubject.subscribe({
      next: (res) => {
        this.ajaxStatuses.push('AJAX call 1 status code: ' + res.status + ' (UserName: ' + (res.response as any).results[0].name.first + ' ' + (res.response as any).results[0].name.last + ')');
      }
    });
    apiSubject.subscribe({
      next: (res) => {
        this.ajaxStatuses.push('AJAX call 1 status code: ' + res.status + ' (UserName: ' + (res.response as any).results[0].name.first + ' ' + (res.response as any).results[0].name.last + ')');
      }
    });
    apiSubject.subscribe({
      next: (res) => {
        this.ajaxStatuses.push('AJAX call 1 status code: ' + res.status + ' (UserName: ' + (res.response as any).results[0].name.first + ' ' + (res.response as any).results[0].name.last + ')');
      }
    });

    userData.subscribe(apiSubject);
  }

  onTestBehaviorSubject() {
    this.behaviorSubject.subscribe({
      next: (val) => {
        if (this.behaviorStatuses['subscriber_1'] === undefined) {
          this.behaviorStatuses['subscriber_1'] = [];
        };
        if (!this.behaviorStatuses['subscriber_1'].includes(val)) {
          this.behaviorStatuses['subscriber_1'].push(val);
        };
      }
    });
    this.behaviorSubject.subscribe({
      next: (val) => {
        if (this.behaviorStatuses['subscriber_2'] === undefined) {
          this.behaviorStatuses['subscriber_2'] = [];
        };
        if (!this.behaviorStatuses['subscriber_2'].includes(val)) {
          this.behaviorStatuses['subscriber_2'].push(val);
        };
      }
    })

    /// subject.next(...); // nem történik adatküldés
  }

  newValueForBehaviorSubject() {
    this.behaviorSubject.next('Next value');

    this.behaviorSubject.subscribe({
      next: (val) => {
        if (this.behaviorStatuses['subscriber_3'] === undefined) {
          this.behaviorStatuses['subscriber_3'] = [];
        };
        if (!this.behaviorStatuses['subscriber_3'].includes(val)) {
          this.behaviorStatuses['subscriber_3'].push(val);
        };
      }
    })
  }

  onTestReplaySubject() {
    this.replaySubject.next(100);
    this.replaySubject.next(200);
    this.replaySubject.next(300);

    this.replaySubject.subscribe({ // Subscriber 1
      next: (val) => {
        if (this.replayStatuses['subscriber_1'] === undefined) {
          this.replayStatuses['subscriber_1'] = [];
        };
        this.replayStatuses['subscriber_1'].push(val);
      }
    });

    this.replaySubject.subscribe({ // Subscriber 2
      next: (val) => {
        if (this.replayStatuses['subscriber_2'] === undefined) {
          this.replayStatuses['subscriber_2'] = [];
        };
        this.replayStatuses['subscriber_2'].push(val);
      }
    });

    this.replaySubject.next(400);

    this.replaySubject.subscribe({ // Subscriber 3
      next: (val) => {
        if (this.replayStatuses['subscriber_3'] === undefined) {
          this.replayStatuses['subscriber_3'] = [];
        };
        this.replayStatuses['subscriber_3'].push(val);
      }
    });
  }

  addNewReplaySubjectValue(val: string) {
    this.replaySubject.next(parseInt(val));
  }


  onTestReplaySubject2() {
    this.replaySubject2.next(100);
    this.replaySubject2.next(200);
    this.replaySubject2.next(300);

    this.replaySubject2.subscribe({ // Subscriber 1
      next: (val) => {
        if (this.replayStatuses2['subscriber_1'] === undefined) {
          this.replayStatuses2['subscriber_1'] = [];
        };
        this.replayStatuses2['subscriber_1'].push(val);
      }
    });

    this.replaySubject2.subscribe({ // Subscriber 2
      next: (val) => {
        if (this.replayStatuses2['subscriber_2'] === undefined) {
          this.replayStatuses2['subscriber_2'] = [];
        };
        this.replayStatuses2['subscriber_2'].push(val);
      }
    });

    this.replaySubject2.next(400);

    this.replaySubject2.subscribe({ // Subscriber 3
      next: (val) => {
        if (this.replayStatuses2['subscriber_3'] === undefined) {
          this.replayStatuses2['subscriber_3'] = [];
        };
        this.replayStatuses2['subscriber_3'].push(val);
      }
    });
  };

  onSubscribeReplaySubject() {
    this.replaySubjectSubscriptionIsDone = true;
    let replayTimer = timer(0, 5000).subscribe(() => {
      this.replaySubjectMessages = [];
      this.replaySubjectSubscription?.unsubscribe();

      this.replaySubjectSubscription = this.messageService.messages$.subscribe((message) => {
        this.replaySubjectMessages.push(message);
      });

      this.subscriptions = [...this.subscriptions, this.replaySubjectSubscription, replayTimer];
    });
  }

  sendReplaySubjectMessage() {
    if (this.newReplaySubjectMessage) {
      this.messageService.addMessage(this.newReplaySubjectMessage);
      this.newReplaySubjectMessage = '';
    }
  }

  onTestAsyncSubject(val1: any, val2: any, val3: any) {
    /* let asyncSub = this.asyncSubject.subscribe({ // Mindegy, mikor/hol iratkozunk fel
      next: (val) => { this.asyncSubValue = val },
      error: (err) => { },
      complete: () => { },
    }); */

    this.asyncSubject.next(val1);
    this.asyncSubject.next(val2);
    this.asyncSubject.next(val3);
    this.asyncSubject.complete();
    this.asyncSubject.next(666);

    let asyncSub = this.asyncSubject.subscribe({
      next: (val) => { this.asyncSubValue = val },
      error: (err) => { },
      complete: () => { },
    });

    this.subscriptions = [...this.subscriptions, asyncSub];
  }

  onSubscribeOnAsyncSubjectLater() {
    let asyncSub2 = this.asyncSubject.subscribe({
      next: (val) => { this.asyncSubValue2 = val },
      error: (err) => { },
      complete: () => { },
    });

    this.subscriptions = [...this.subscriptions, asyncSub2];
  }

  subToObs() {
    this.observable.subscribe({
      next: (val) => { },
      error: (err) => { },
      complete: () => { }
    });
  }

  getDataFromPromiseAndObservable() {
    this.promise.then((data) => {
      this.promiseGetText.push(data);
    });

    this.observable.subscribe({
      next: (val) => { this.observableGetText.push(val) },
      error: (err) => { },
      complete: () => { }
    });
  }

  subscribeOnCounter() {
    if (!this.counterSubscription1) {
      this.counterSubscription1 = this.counter.subscribe({
        next: (val) => {
          this.counterValues1.push(val);
        },
        error: (err) => { },
        complete: () => { }
      });
    }

    if (!this.counterSubscription2) {
      this.counterSubscription2 = this.counter.subscribe({
        next: (val) => {
          this.counterValues2.push(val);
        },
        error: (err) => { },
        complete: () => { }
      });
    }
  }

  unsubscribeOnCounter1() {
    if (this.counterSubscription1) {
      this.counterSubscription1.unsubscribe();
    };
    this.counterSubscription1 = null;
  }

  unsubscribeOnCounter2() {
    if (this.counterSubscription2) {
      this.counterSubscription2.unsubscribe();
    };
    this.counterSubscription2 = null;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
