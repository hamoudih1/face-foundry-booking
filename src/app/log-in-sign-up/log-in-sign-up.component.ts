import { Component, ViewChild, DoCheck } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-log-in-sign-up',
  templateUrl: './log-in-sign-up.component.html',
  styleUrls: ['./log-in-sign-up.component.css']
})
export class LogInSignUpComponent {

  model: any = {};
  
  @ViewChild('loginForm', {static: true}) loginForm: NgForm;
  @ViewChild('signupForm', {static: true}) signupForm: NgForm;

  constructor(private appService: AppService) { }

  onSubmit(postData, form: string) {
    this.appService.endpoint = "http://127.0.0.1:5002/create";
    if (form == "login") {
      console.log(this.loginForm);
      this.loginForm.reset();
    }
    else {
      let jsonData: any = {
        "Password": postData.signupPassword,
        "FirstName": postData.firstName,
        "LastName": postData.lastName,
        "CellPhone": postData.signupPhone,
        "Email": postData.signupEmail,
        "AllowReceiveEmails": true,
        "AllowReceivePromotionalEmails": true,
        "AllowReceiveSMS": true,
        "RequireCustomerPhone": true,
        "RequireCustomerAddress": true,
        "access_token": this.appService.access_token,
        "LocationID": 38698
      };

      //let realJSON = JSON.parse(jsonData);
      this.appService.onPost(jsonData);
      console.log(jsonData);
      

      this.signupForm.reset();
    }
  }
}
