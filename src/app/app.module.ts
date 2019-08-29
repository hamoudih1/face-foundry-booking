import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CreditCardDirectivesModule } from 'angular-cc-library'
import { NgbModule, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LogInSignUpComponent } from './log-in-sign-up/log-in-sign-up.component';
import { LocationComponent } from './location/location.component';
import { ServicesComponent } from './services/services.component';
import { StaffComponent } from './staff/staff.component';
import { DateComponent } from './date/date.component';
import { TimeComponent } from './time/time.component';
import { ReviewComponent } from './review/review.component';
import { PaymentComponent } from './payment/payment.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { TimeItemComponent } from './time/time-item/time-item.component';
import { LocationItemComponent } from './location/location-item/location-item.component';
import { ServiceItemComponent } from './services/service-item/service-item.component';
import { WelcomeComponent } from './welcome/welcome.component';

import { MustMatchDirective } from './validators/must-match.directive';
import { RouteGuard } from './route.guard';

const appRoutes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'start', component: LogInSignUpComponent, canActivate: [RouteGuard]},
  {path: 'location', component: LocationComponent, canActivate: [RouteGuard]},
  {path: 'services', component: ServicesComponent, canActivate: [RouteGuard]},
  {path: 'staff', component: StaffComponent, canActivate: [RouteGuard]},
  {path: 'date', component: DateComponent, canActivate: [RouteGuard]},
  {path: 'time', component: TimeComponent, canActivate: [RouteGuard]},
  {path: 'review', component: ReviewComponent, canActivate: [RouteGuard]},
  {path: 'payment', component: PaymentComponent, canActivate: [RouteGuard]},
  {path: 'thank-you', component: ThankYouComponent, canActivate: [RouteGuard]},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    LogInSignUpComponent,
    LocationComponent,
    ServicesComponent,
    StaffComponent,
    DateComponent,
    TimeComponent,
    ReviewComponent,
    PaymentComponent,
    ThankYouComponent,
    TimeItemComponent,
    LocationItemComponent,
    ServiceItemComponent,
    WelcomeComponent,
    MustMatchDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    CreditCardDirectivesModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
