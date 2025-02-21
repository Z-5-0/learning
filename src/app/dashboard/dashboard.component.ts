import { Component } from '@angular/core';

interface Icons {
  class: string,
  route: string,
  colored: boolean,
  opacity: number
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  opacityScale: any = {
    low: 0.2,
    high: 1
  };
  devIcons: Icons[] = [
    { class: 'devicon-javascript-plain', route: 'js', colored: true, opacity: this.opacityScale.high },
    { class: 'devicon-typescript-plain', route: 'typescript', colored: true, opacity: this.opacityScale.high },
    { class: 'devicon-json-plain', route: 'json', colored: true, opacity: this.opacityScale.high },
    { class: 'devicon-xml-plain', route: 'xml', colored: true, opacity: this.opacityScale.high },
    { class: 'devicon-angularjs-plain', route: 'angular', colored: true, opacity: this.opacityScale.high },
    { class: 'devicon-react-original', route: 'react', colored: true, opacity: this.opacityScale.high },
    { class: 'devicon-vuejs-plain', route: 'vue', colored: false, opacity: this.opacityScale.low },
    { class: 'devicon-ionic-original', route: 'ionic', colored: true, opacity: this.opacityScale.high },
    { class: 'devicon-rxjs-plain', route: 'rxjs', colored: true, opacity: this.opacityScale.high },
    { class: 'devicon-redux-original', route: 'reduc', colored: false, opacity: this.opacityScale.low },
    { class: 'devicon-css3-plain', route: 'cssscss', colored: true, opacity: this.opacityScale.high },
    { class: 'devicon-sass-original', route: 'cssscss', colored: true, opacity: this.opacityScale.high },
    { class: 'devicon-angularmaterial-plain', route: 'material', colored: true, opacity: this.opacityScale.high },
    { class: 'devicon-bootstrap-plain', route: 'bootstrap', colored: true, opacity: this.opacityScale.high },
    { class: 'devicon-tailwindcss-original', route: 'tailwind', colored: false, opacity: this.opacityScale.low },
    { class: 'devicon-webpack-plain', route: 'webpack', colored: true, opacity: this.opacityScale.high },
    { class: 'devicon-grunt-plain', route: 'grunt', colored: false, opacity: this.opacityScale.low },
    { class: 'devicon-gulp-plain', route: 'gulp', colored: false, opacity: this.opacityScale.low },
    { class: 'devicon-lodash-plain', route: 'lodash', colored: false, opacity: this.opacityScale.low },
    { class: 'devicon-dart-plain', route: 'dart', colored: false, opacity: this.opacityScale.low }
  ];
}
