import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { CodeComponent } from './code/code.component';
import { AboutDetailsComponent } from './about/about-details/about-details.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from 'src/shared/guards/auth-guard.service';
import { CanActivate, CanActivateChild, resolve } from 'src/shared/guards/auth.guard';
import { ResolveComponent } from './resolve/resolve.component';
import { AboutDetailsService } from 'src/shared/services/about-details.service';
import { ListComponent } from './list/list.component';
import { ItemComponent } from './list/item/item.component';
import { ReactiveformComponent } from './reactiveform/reactiveform.component';
import { TemplatedrivenformComponent } from './templatedrivenform/templatedrivenform.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskComponent } from './dashboard/task/task.component';
import { AuthloginComponent } from './dashboard/authlogin/authlogin.component';
import { AuthcontactComponent } from './dashboard/authcontact/authcontact.component';
import { AuthFirebaseGuard } from 'src/shared/guards/auth-firebase-guard';
import { ListComponent as ListModuleComponent } from './moduling/list/list.component';
import { OverviewComponent } from './moduling/overview/overview.component';
import { StandaloneComponent } from './standalone/standalone.component';
import { DetailsComponent } from './standalone/details/details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'about', component: AboutComponent, canActivateChild: [CanActivateChild], children: [
      { path: ':id', component: AboutDetailsComponent, data: { order: 'test', price: 2990 } }
    ]
  },
  // { path: 'about/:id', component: AboutDetailsComponent },
  { path: 'contact', component: ContactComponent, canDeactivate: [(component: ContactComponent) => { return component.canExit() }] },
  { path: 'about', component: AboutComponent, outlet: 'navi', data: { typeSwitcher: 'navi-outlet' } },
  { path: 'contact', component: ContactComponent, outlet: 'navi', data: { typeSwitcher: 'navi-outlet' } },
  { path: 'about', component: AboutComponent, outlet: 'test', data: { typeSwitcher: 'test-outlet' } },
  { path: 'contact', component: ContactComponent, outlet: 'test', data: { typeSwitcher: 'test-outlet' } },
  { path: 'about', component: AboutComponent, outlet: 'secondary', data: { typeSwitcher: 'secondary-outlet' } },
  { path: 'code', component: CodeComponent, outlet: 'navi' },
  { path: 'login', component: LoginComponent },
  { path: 'resolve', component: ResolveComponent, resolve: { details: resolve } },

  { path: 'dashboard/:id', component: TaskComponent, outlet: 'http' },

  { path: 'dashboard/login', component: AuthloginComponent, outlet: 'auth' },
  { path: 'dashboard/contact', component: AuthcontactComponent, outlet: 'auth', canActivate: [AuthFirebaseGuard] },

  {
    path: 'moduling', outlet: 'module', children: [
      { path: 'list', component: ListModuleComponent },
      { path: 'overview', component: OverviewComponent },
    ]
  },

  { path: 'standalone', component: StandaloneComponent, outlet: 'standalone' },
  { path: 'details', component: DetailsComponent, outlet: 'standalone' },


  { path: 'list', component: ListComponent, outlet: 'spa' },
  { path: 'list/:id', component: ItemComponent, outlet: 'spa' },
  { path: 'reactiveform', component: ReactiveformComponent, outlet: 'spa' },
  { path: 'templatedrivenform', component: TemplatedrivenformComponent, outlet: 'spa' },
  { path: '**', component: NotfoundComponent, outlet: 'spa' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NaviRoutingModule { }
