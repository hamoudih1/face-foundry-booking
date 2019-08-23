import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

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
    TimeItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
