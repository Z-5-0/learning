import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoxComponent } from './js/box/box.component';
import { ColorChooserComponent } from './js/color-chooser/color-chooser.component';
import { FormsModule, NgModel } from "@angular/forms";
import { RxjsComponent } from './rxjs/rxjs.component';
import { JsComponent } from './js/js.component';
import { AngularComponent } from './angular/angular.component';
import { TypescriptComponent } from './typescript/typescript.component';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SsrComponent } from './ssr/ssr.component';
import { CssscssComponent } from './cssscss/cssscss.component';
import { NotionsComponent } from './notions/notions.component';
import { SharedModule } from "../shared/shared.module";
import { XmlComponent } from './xml/xml.component';
import { JsonComponent } from './json/json.component';
import { MaterialComponent } from './material/material.component';
import { WebpackComponent } from './webpack/webpack.component';
import { ReactComponent } from './react/react.component';
import { BootstrapComponent } from './bootstrap/bootstrap.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SearchComponent } from './angular/search/search.component';
import { ChildComponent } from './angular/child/child.component';
import { VehiclesComponent } from './angular/vehicles/vehicles.component';
import { IonicComponent } from './ionic/ionic.component';
import { VscodeComponent } from './vscode/vscode.component';
import { ApiComponent } from './api/api.component';
import { NgHyphenComponent } from './angular/ng-hyphen/ng-hyphen.component';
import { LifecycleComponent } from './angular/lifecycle/lifecycle.component';
import { ServiceExampleComponent } from './angular/service-example/service-example.component';
import { Comp1Component } from './angular/service-example/comp1/comp1.component';
import { Comp2Component } from './angular/service-example/comp2/comp2.component';
import { Comp3Component } from './angular/service-example/comp3/comp3.component';
import { UserListComponent } from './angular/service-example/user-list/user-list.component';
import { UserDetailsComponent } from './angular/service-example/user-details/user-details.component';
import { ObservableModule } from './angular/observable/observable.module';
import { AngularRxjsComponent } from './angular/rxjs/rxjs.component';
import { GitComponent } from './git/git.component';
import { ApiAngularComponent } from './angular/api/api.component';
import { NewTaskComponent } from './angular/rxjs/subjects/new-task/new-task.component';
import { ShowTaskComponent } from './angular/rxjs/subjects/show-task/show-task.component';
import { SubjectComponent } from './angular/rxjs/subjects/subject/subject.component';
import { ReplayComponent } from './angular/rxjs/subject/replay/replay.component';
import { NaviModule } from './angular/navi/navi.module';
import { SeoComponent } from './seo/seo.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { PipingComponent } from './angular/piping/piping.component';
import { UsersComponent } from './angular/users/users.component';
import { ConfirmDeleteComponent } from './angular/users/confirm-delete/confirm-delete.component';
import { DatabaseComponent } from './database/database.component';
import { CoreModule } from './core.module';
import { NgrxComponent } from './angular/ngrx/ngrx.component';
import { SignalsComponent } from './angular/signals/signals.component';
import { UnittestComponent } from './angular/unittest/unittest.component';
import { TestsModule } from 'src/tests/tests.module';

@NgModule({
  declarations: [
    AppComponent,
    BoxComponent,
    ColorChooserComponent,
    RxjsComponent,
    JsComponent,
    AngularComponent,
    TypescriptComponent,
    SsrComponent,
    CssscssComponent,
    NotionsComponent,
    XmlComponent,
    JsonComponent,
    MaterialComponent,
    WebpackComponent,
    ReactComponent,
    BootstrapComponent,
    SearchComponent,
    ChildComponent,
    VehiclesComponent,
    IonicComponent,
    VscodeComponent,
    ApiComponent,
    NgHyphenComponent,
    LifecycleComponent,
    ServiceExampleComponent,
    Comp1Component,
    Comp2Component,
    Comp3Component,
    UserListComponent,
    UserDetailsComponent,
    AngularRxjsComponent,
    GitComponent,
    ApiAngularComponent,
    NewTaskComponent,
    ShowTaskComponent,
    SubjectComponent,
    ReplayComponent,
    SeoComponent,
    NewsFeedComponent,
    PipingComponent,
    UsersComponent,
    ConfirmDeleteComponent,
    DatabaseComponent,
    NgrxComponent,
    SignalsComponent,
    UnittestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    NgbModule,
    ObservableModule,
    NaviModule,
    CoreModule,
    TestsModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
