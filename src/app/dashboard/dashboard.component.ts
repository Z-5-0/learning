import { Component } from '@angular/core';

interface Icons {
  class: string,
  route: string,
  isIcon: boolean,
  colored: boolean,
  opacity: number,
  url?: string
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
    { class: 'devicon-javascript-plain', route: 'js', isIcon: true, colored: true, opacity: this.opacityScale.high },
    { class: 'devicon-typescript-plain', route: 'typescript', isIcon: true, colored: true, opacity: this.opacityScale.high },
    { class: 'devicon-json-plain', route: 'json', isIcon: true, colored: true, opacity: this.opacityScale.high },
    { class: 'devicon-xml-plain', route: 'xml', isIcon: true, colored: true, opacity: this.opacityScale.high },
    { class: 'devicon-angularjs-plain', route: 'angular', isIcon: true, colored: true, opacity: this.opacityScale.high },
    { class: 'devicon-react-original', route: 'react', isIcon: true, colored: true, opacity: this.opacityScale.high },
    { class: 'devicon-vuejs-plain', route: 'vue', isIcon: true, colored: false, opacity: this.opacityScale.low },
    { class: 'devicon-ionic-original', route: 'ionic', isIcon: true, colored: false, opacity: this.opacityScale.low },
    { class: 'devicon-rxjs-plain', route: 'rxjs', isIcon: true, colored: true, opacity: this.opacityScale.high },
    { class: 'devicon-redux-original', route: 'redux', isIcon: true, colored: false, opacity: this.opacityScale.low },
    { class: 'devicon-lodash-plain', route: 'lodash', isIcon: true, colored: false, opacity: this.opacityScale.low },
    { class: 'devicon-css3-plain', route: 'cssscss', isIcon: true, colored: true, opacity: this.opacityScale.high },
    { class: 'devicon-sass-original', route: 'cssscss', isIcon: true, colored: true, opacity: this.opacityScale.high },
    { class: '', route: 'primeng', isIcon: false, colored: false, opacity: this.opacityScale.low, url: 'assets/imgs/logos/primeng_logo' },
    { class: 'devicon-angularmaterial-plain', route: 'material', isIcon: true, colored: true, opacity: this.opacityScale.high },
    { class: 'devicon-bootstrap-plain', route: 'bootstrap', isIcon: true, colored: true, opacity: this.opacityScale.high },
    { class: 'devicon-tailwindcss-original', route: 'tailwind', isIcon: true, colored: false, opacity: this.opacityScale.low },
    { class: 'devicon-antdesign-plain', route: 'antdesign', isIcon: true, colored: false, opacity: this.opacityScale.low },
    { class: '', route: 'leaflet', isIcon: false, colored: false, opacity: this.opacityScale.low, url: 'assets/imgs/logos/leaflet_logo' },
    { class: '', route: 'agm', isIcon: false, colored: false, opacity: this.opacityScale.low, url: 'assets/imgs/logos/amg_logo' },
    { class: 'devicon-webpack-plain', route: 'webpack', isIcon: true, colored: true, opacity: this.opacityScale.high },
    { class: 'devicon-grunt-plain', route: 'grunt', isIcon: true, colored: false, opacity: this.opacityScale.low },
    { class: 'devicon-gulp-plain', route: 'gulp', isIcon: true, colored: false, opacity: this.opacityScale.low },
    { class: 'devicon-dart-plain', route: 'dart', isIcon: true, colored: false, opacity: this.opacityScale.low },
  ];
}
