import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RxjsComponent } from "./rxjs/rxjs.component";
import { JsComponent } from "./js/js.component";
import { AngularComponent } from "./angular/angular.component";
import { TypescriptComponent } from "./typescript/typescript.component";
import { CssscssComponent } from "./cssscss/cssscss.component";
import { SsrComponent } from "./ssr/ssr.component";
import { XmlComponent } from "./xml/xml.component";
import { JsonComponent } from "./json/json.component";
import { WebpackComponent } from "./webpack/webpack.component";
import { ReactComponent } from "./react/react.component";
import { BootstrapComponent } from "./bootstrap/bootstrap.component";
import { IonicComponent } from "./ionic/ionic.component";
import { VscodeComponent } from "./vscode/vscode.component";
import { ApiComponent } from "./api/api.component";
import { SeoComponent } from './seo/seo.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { DatabaseComponent } from './database/database.component';
import { NgrxComponent } from './angular/ngrx/ngrx.component';
import { VueComponent } from './vue/vue.component';
import { ReduxComponent } from './redux/redux.component';
import { DartComponent } from './dart/dart.component';
import { TailwindComponent } from './tailwind/tailwind.component';
import { LodashComponent } from './lodash/lodash.component';
import { GulpComponent } from './gulp/gulp.component';
import { FourofourComponent } from './fourofour/fourofour.component';
import { YouCantActivate } from 'src/shared/guards/fourofour.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GruntComponent } from './grunt/grunt.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'js', component: JsComponent },
  { path: 'typescript', component: TypescriptComponent },
  { path: 'regex', loadChildren: () => import('./regex/regex.module').then(mod => mod.RegexModule) },
  { path: 'extras', loadChildren: () => import('./extras/extras.module').then(mod => mod.ExtrasModule) },
  { path: 'json', component: JsonComponent },
  { path: 'xml', component: XmlComponent },
  {
    path: 'angular',
    component: AngularComponent,
    loadChildren: () => import('./angular/navi/navi.module').then(m => m.NaviModule), // Lazy load
  },
  { path: 'react', component: ReactComponent },
  { path: 'vue', component: VueComponent, canActivate: [YouCantActivate] },
  { path: 'ionic', component: IonicComponent, canActivate: [YouCantActivate] },
  { path: 'rxjs', component: RxjsComponent },
  { path: 'redux', component: ReduxComponent, canActivate: [YouCantActivate] },
  { path: 'cssscss', component: CssscssComponent },
  {
    path: 'material',
    loadChildren: () => import('./material/material.module').then(m => m.MaterialModule),
  },
  // { path: 'material', component: MaterialComponent },
  // { path: 'material', loadComponent: () => import('./material/material.component').then(mod => mod.MaterialComponent) },
  { path: 'bootstrap', component: BootstrapComponent },
  { path: 'tailwind', component: TailwindComponent, canActivate: [YouCantActivate] },
  { path: 'webpack', component: WebpackComponent },
  { path: 'grunt', component: GruntComponent, canActivate: [YouCantActivate] },
  { path: 'gulp', component: GulpComponent, canActivate: [YouCantActivate] },
  { path: 'ssr', component: SsrComponent },
  { path: 'seo', component: SeoComponent },
  { path: 'lodash', component: LodashComponent, canActivate: [YouCantActivate] },
  { path: 'api', component: ApiComponent },
  { path: 'database', component: DatabaseComponent },
  { path: 'dart', component: DartComponent, canActivate: [YouCantActivate] },
  { path: 'vscode', component: VscodeComponent },
  { path: 'newsfeed', component: NewsFeedComponent },
  // { path: 'ngrx', component: NgrxComponent },
  { path: '404', component: FourofourComponent },
  { path: '**', component: FourofourComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'disabled',
    anchorScrolling: 'enabled',
    preloadingStrategy: PreloadAllModules,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
