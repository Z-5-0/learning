import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingService } from "./services/scrolling.service";
import { ChangeToGreenDirective } from './directives/change-to-green.directive';
import { SetBackgroundToBrownDirective } from './directives/set-background-to-brown.directive';
import { HighlightDirective } from "./directives/highlight.directive";
import { HoverDirective } from "./directives/hover.directive";
import { SampleDirective } from "./directives/sample.directive";
import { PropertybindingoldDirective } from './directives/propertybingingold.directive';
import { PropertybindingDirective } from './directives/propertybinging.directive';
import { DisableElementDirective } from './directives/disable-element.directive';
import { CustomClassDirective } from './directives/custom-class.directive';
import { CustomStyleDirective } from './directives/custom-style.directive';
import { IfDirective } from './directives/if.directive';
import { SubscriptionService } from './services/subscription.service';
import { UserService } from './services/user.service';
import { LoggerService } from './services/logger.service';
import { AboutDetailsService } from './services/about-details.service';
import { ProcentPipe } from './pipes/procent.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { ViewContainer } from './directives/viewcontainer.directive';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingInterceptorService } from './services/logging-interceptor.service';
import { LoadingDirective } from './directives/loading.directive';

export const USER_TOKEN = new InjectionToken<UserService>('USER_SERVICE');

@NgModule({
  declarations: [
    ChangeToGreenDirective,
    SetBackgroundToBrownDirective,
    HighlightDirective,
    HoverDirective,
    SampleDirective,
    PropertybindingDirective,
    PropertybindingoldDirective,
    DisableElementDirective,
    CustomClassDirective,
    CustomStyleDirective,
    IfDirective,
    ProcentPipe,
    FilterPipe,
    ViewContainer,
    LoadingDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ChangeToGreenDirective,
    SetBackgroundToBrownDirective,
    HighlightDirective,
    HoverDirective,
    SampleDirective,
    PropertybindingoldDirective,
    PropertybindingDirective,
    DisableElementDirective,
    CustomClassDirective,
    CustomStyleDirective,
    IfDirective,
    ProcentPipe,
    FilterPipe,
    ViewContainer,
    LoadingDirective,
  ],
  providers: [
    ScrollingService,
    SubscriptionService,
    // {provide: 'USER_SERVICE', useClass: UserService},
    { provide: USER_TOKEN, useClass: UserService },
    LoggerService,
    AboutDetailsService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptorService, multi: true }
  ]
})
export class SharedModule {
}
