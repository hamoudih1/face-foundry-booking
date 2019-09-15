import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreditCardValidator } from 'angular-cc-library';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @ViewChild('paymentForm', {static : true}) paymentForm: NgForm;

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() { }

  onSubmit(form){
    console.log(form);
  }

  make_appointment() {
    this.appService.endpoint = "http://127.0.0.1:5002/book"
    const current_date = new Date();
    const current_treatment_time = this.appService.reviewItem.time.split(':');
    const current_treatment_hour = parseInt(current_treatment_time[0], 10);
    const current_treatment_minute = parseInt(current_treatment_time[1], 10);
    const current_treatment_date = new Date(this.appService.reviewItem.date.year,
                                            this.appService.reviewItem.date.month,
      this.appService.reviewItem.date.day,
      current_treatment_hour,
      current_treatment_minute);
    const postData = {"ItineraryTimeSlotList": [
      {
        "StartDateTimeOffset": current_date.toDateString,
        "CurrentPackagePrice": {
          // TODO: fix for muti treatment
          "Amount": this.appService.reviewItem.service[0].price,

          // TODO: currently set up to usd
          "CurrencyCode": "USD"
      },
        "TreatmentTimeSlots": [
          {// TODO: fix for muti treatment
            "TreatmentID": this.appService.reviewItem.service[0].treatmentID,
            "StartDateTimeOffset": current_treatment_date.toISOString
        }
        ]
      }
    ],
    "LocationID": this.appService.reviewItem.location.locationID,
      "Customer": {
      "FirstName": "test",
        "LastName": "test",
          "Email": "test4234243242@test432.com",
            "HomePhone": "2221112222"
    },
    "AppointmentPayment": {
      "PaymentItem": {
        "Method": {
          "ID": 1,
            "Name": "Credit Card"
        },
        "CreditCard": {
          "Type": {
            "ID": 2,
              "Name": "Visa"
          },
          "Number": "4567890712341234",
            "NameOnCard": "test test",
              "ExpirationDateOffset": "2020-03-31T00:00:00+00:00",
                "SecurityCode": "321",
                  "BillingZip": "12345"
        },
        "Amount": {
          // TODO: fix for muti treatments
          "Amount": this.appService.reviewItem.service[0].price,
          //set default as USD
            "CurrencyCode": "USD"
        }
      }
    },
    "access_token": this.appService.access_token_user
  }

    this.appService.onPostPayment(postData).subscribe(
      response => { console.log(response); },
      error => {},
      () => {});
  }
}
