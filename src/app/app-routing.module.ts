import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RxjsComponent } from "./rxjs/rxjs.component";
import { JsComponent } from "./js/js.component";
import { AngularComponent } from "./angular/angular.component";
import { TypescriptComponent } from "./typescript/typescript.component";
import { AngularplusComponent } from "./angularplus/angularplus.component";
import { CssscssComponent } from "./cssscss/cssscss.component";
import { SsrComponent } from "./ssr/ssr.component";
import { NotionsComponent } from "./notions/notions.component";
import { XmlComponent } from "./xml/xml.component";
import { JsonComponent } from "./json/json.component";
import { MaterialComponent } from "./material/material.component";
import { WebpackComponent } from "./webpack/webpack.component";
import { ReactComponent } from "./react/react.component";
import { BootstrapComponent } from "./bootstrap/bootstrap.component";
import { IonicComponent } from "./ionic/ionic.component";
import { VscodeComponent } from "./vscode/vscode.component";
import { ApiComponent } from "./api/api.component";
import { GitComponent } from './git/git.component';
import { SeoComponent } from './seo/seo.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { DatabaseComponent } from './database/database.component';
import { NgrxComponent } from './angular/ngrx/ngrx.component';

const routes: Routes = [
  { path: 'js', component: JsComponent },
  { path: 'typescript', component: TypescriptComponent },
  {
    path: 'angular',
    component: AngularComponent,
    loadChildren: () => import('./angular/navi/navi.module').then(m => m.NaviModule), // Lazy load
  },
  { path: 'angularplus', loadChildren: () => import('./angularplus/angularplus.module').then(mod => mod.AngularPlusModule) },
  { path: 'rxjs', component: RxjsComponent },
  { path: 'ngrx', component: NgrxComponent },
  { path: 'cssscss', component: CssscssComponent },
  { path: 'ssr', component: SsrComponent },
  { path: 'bootstrap', component: BootstrapComponent },
  { path: 'material', component: MaterialComponent },
  { path: 'webpack', component: WebpackComponent },
  { path: 'notions', component: NotionsComponent },
  { path: 'json', component: JsonComponent },
  { path: 'xml', component: XmlComponent },
  { path: 'react', component: ReactComponent },
  { path: 'ionic', component: IonicComponent },
  { path: 'seo', component: SeoComponent },
  { path: 'api', component: ApiComponent },
  { path: 'database', component: DatabaseComponent },
  { path: 'git', component: GitComponent },
  { path: 'vscode', component: VscodeComponent },
  { path: 'newsfeed', component: NewsFeedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
