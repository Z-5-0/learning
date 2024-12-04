import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NaviRoutingModule } from './navi-routing.module';
import { NaviComponent } from './navi.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { CodeComponent } from './code/code.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AboutDetailsComponent } from './about/about-details/about-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ResolveComponent } from './resolve/resolve.component';
import { ListComponent } from './list/list.component';
import { ItemComponent } from './list/item/item.component';
import { ReactiveformComponent } from './reactiveform/reactiveform.component';
import { TemplatedrivenformComponent } from './templatedrivenform/templatedrivenform.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbCollapseModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskComponent } from './dashboard/task/task.component';
import { AuthloginComponent } from './dashboard/authlogin/authlogin.component';
import { SharedModule } from 'src/shared/shared.module';
import { AuthcontactComponent } from './dashboard/authcontact/authcontact.component';
import { OverviewComponent } from './moduling/overview/overview.component';
import { HomeComponent as HomeModuleComponent } from './moduling/home/home.component';
import { ListComponent as ListModuleComponent } from './moduling/list/list.component';

@NgModule({
  declarations: [
    NaviComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    CodeComponent,
    HomeComponent,
    NotfoundComponent,
    AboutDetailsComponent,
    LoginComponent,
    ResolveComponent,
    ListComponent,
    ItemComponent,
    ReactiveformComponent,
    TemplatedrivenformComponent,
    NotfoundComponent,
    DashboardComponent,
    TaskComponent,
    AuthloginComponent,
    AuthcontactComponent,
    HomeModuleComponent,
    OverviewComponent,
    ListModuleComponent,
  ],
  imports: [
    CommonModule,
    NaviRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbCollapseModule,
    NgbToastModule,
    SharedModule,
  ],
  exports: [
    NaviComponent
  ]
})
export class NaviModule { }
