import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoxComponent } from './js/box/box.component';
import { ColorChooserComponent } from './js/color-chooser/color-chooser.component';
import { FormsModule, NgModel, ReactiveFormsModule } from "@angular/forms";
import { RxjsComponent } from './rxjs/rxjs.component';
import { JsComponent } from './js/js.component';
import { AngularComponent } from './angular/angular.component';
import { TypescriptComponent } from './typescript/typescript.component';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SsrComponent } from './ssr/ssr.component';
import { CssscssComponent } from './cssscss/cssscss.component';
import { SharedModule } from "../shared/shared.module";
import { XmlComponent } from './xml/xml.component';
import { JsonComponent } from './json/json.component';
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
import { provideState, provideStore, StoreModule } from '@ngrx/store';
import { CounterReducer } from './extras/state/counter/counter.reducer';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VueComponent } from './vue/vue.component';
import { ReduxComponent } from './redux/redux.component';
import { TailwindComponent } from './tailwind/tailwind.component';
import { GruntComponent } from './grunt/grunt.component';
import { GulpComponent } from './gulp/gulp.component';
import { LodashComponent } from './lodash/lodash.component';
import { DartComponent } from './dart/dart.component';
import { AnimerouteComponent } from './extras/anime/animeroute/animeroute.component';
import { AnimerouteModule } from './extras/anime/animeroute/animeroute.module';
import { AnimerouteRoutingModule } from './extras/anime/animeroute/animeroute-routing.module';
import { CdkScrollable, OverlayModule } from '@angular/cdk/overlay';
import { AnimeComponent } from './extras/anime/anime.component';
import { ContentComponent } from './extras/anime/content/content.component';
import { MenuComponent } from './extras/anime/menu/menu.component';
import { FormComponent } from './extras/anime/form/form.component';
import { ModalComponent } from './extras/anime/modal/modal.component';
import { PlayersComponent } from './extras/anime/players/players.component';
import { PlayerDetailsComponent } from './extras/anime/players/player-details/player-details.component';
import { FilterPlayerPipe } from './extras/anime/players/filter-player.pipe';
import { SignUpFormComponent } from './extras/anime/sign-up-form/sign-up-form.component';
import { SignUpModalComponent } from './extras/anime/sign-up-modal/sign-up-modal.component';
import { SliderComponent } from './extras/anime/slider/slider.component';
import { NavComponent } from './extras/anime/nav/nav.component';
import { HeaderComponent } from './extras/anime/header/header.component';
import { Slider2Component } from './extras/slider2/slider2.component';
import { FlipComponent } from './extras/flip/flip.component';
import { FadeComponent } from './extras/fade/fade.component';

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
    XmlComponent,
    JsonComponent,
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
    DashboardComponent,
    VueComponent,
    ReduxComponent,
    TailwindComponent,
    GruntComponent,
    GulpComponent,
    LodashComponent,
    DartComponent,
    AnimeComponent,
    ContentComponent,
    MenuComponent,
    FormComponent,
    ModalComponent,
    PlayersComponent,
    PlayerDetailsComponent,
    FilterPlayerPipe,
    SignUpFormComponent,
    SignUpModalComponent,
    SliderComponent,
    NavComponent,
    HeaderComponent,
    Slider2Component,
    FlipComponent,
    FadeComponent
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
    TestsModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
    CdkScrollable,
    AnimerouteModule
  ],
  providers: [
    provideStore(),
    provideState('counter', CounterReducer), // a State nevét, és a Reducer-t kell definiálni
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
