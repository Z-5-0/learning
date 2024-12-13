import { Component, inject, Pipe, PipeTransform } from '@angular/core';
// import { GradePipe } from 'src/tests/pipes/grade.pipe';

@Component({
  selector: 'app-hometest',
  templateUrl: './hometest.component.html',
  styleUrls: ['./hometest.component.scss']
})
export class HometestComponent {
  title: string = 'This is the title of home page';

  subscribeText: string = 'Subscribe';
  isSubscribed: boolean = false;

  apiSubscribeText: string = 'Subscribe';
  isApiSubscribed: boolean = false;

  marks: number[] = [83, 26, 53, 84, 34];

  subscribe() {
    this.isSubscribed = true;
    this.subscribeText = 'Subscribed';
  }

  apiSubcribe() {
    setTimeout(() => {
      this.isApiSubscribed = true;
      this.apiSubscribeText = 'Subscribe';
    }, 3000);
  }
}


@Pipe({
  name: 'grade',
})

class GradePipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
      let grade = '';

      if (value >= 90) {
          grade = 'A';
      } else if (value < 90 && value >= 80) {
          grade = 'B';
      } else if (value < 80 && value >= 70) {
          grade = 'C';
      } else if (value < 70 && value >= 60) {
          grade = 'D';
      } else if (value < 60 && value >= 35) {
          grade = 'E';
      } else if (value < 35) {
          grade = 'F';
      }

      return grade;
  }
}