import { Component, ViewChild, DoCheck } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { RouteService } from '../route.service';

@Component({
  selector: 'app-log-in-sign-up',
  templateUrl: './log-in-sign-up.component.html',
  styleUrls: ['./log-in-sign-up.component.css']
})
export class LogInSignUpComponent {

  model: any = {};
  
  @ViewChild('loginForm', {static: true}) loginForm: NgForm;
  @ViewChild('signupForm', {static: true}) signupForm: NgForm;

  constructor(private appService: AppService, private router: Router, private routeService: RouteService) { }

  ngOnInit() {
    this.routeService.blockRoute();
  }

  onSubmit(postData, form: string) {
    let jsonData: any

    if (form == "login") {
      this.appService.endpoint = "http://127.0.0.1:5002/login"
      
      jsonData = {
        "LocationID": 38698,
        "Email": postData.loginEmail,
        "Password": postData.loginPassword,
        "client_id": "3WCCU4EY81os",
        "client_secret": "ppDcPjF9Ex2G"
      };

      this.appService.onPostLogin(jsonData);
      this.loginForm.reset();

      this.routeService.canAdvance();
      this.router.navigate(['/location']);
    }
    else {
      this.appService.endpoint = "http://127.0.0.1:5002/create";

      jsonData = {
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
        "access_token": this.appService.access_token_user,
        "LocationID": 38698
      };

      this.appService.onPost(jsonData);
      this.signupForm.reset();
      
      this.routeService.canAdvance();
      this.router.navigate(['/location']);
    }
  }
}
