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

  submit: boolean = false;
  logFail: boolean = false;
  signupMobile: boolean = false;
  loginMobile: boolean = false;
  
  model: any = {};

  // register info
  registerData: any;
  isRegistered: boolean;
  registerError: any;

  // login info
  loginData: any;
  loginError: any;

  @ViewChild('loginForm', {static: true}) loginForm: NgForm;
  @ViewChild('signupForm', {static: true}) signupForm: NgForm;

  constructor(private appService: AppService, private router: Router, private routeService: RouteService) { }

  ngOnInit() {
    this.routeService.blockRoute();
  }

  onSubmitCreate(postData, form: string) {
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

      this.appService.onPostLogin(jsonData).subscribe(
        responseData => {
          console.log(responseData);
          this.loginData = responseData;
          this.appService.access_token_user = this.loginData.access_token;
          this.loginError = this.loginData.error;
        },
        error => {console.log(error); },
        () => {
          if (this.appService.access_token_user) {
            this.loginForm.reset();
            this.appService.customerID = this.loginData.Customer.CustomerID;
            this.loginDataClear();
            this.routeService.canAdvance();
            this.router.navigate(['/location']);
          } else {
            // TODO: add popup windows for error.
            console.log(this.loginError);
            this.loginDataClear();
          }
        });
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
        "access_token": this.appService.access_token_welcome,
        "LocationID": 38698
      };

      // register post request to endppoint
      this.appService.onPost(jsonData).subscribe(
        responseData => {
              this.registerData = responseData;
              this.isRegistered = this.registerData.IsSuccess;
              this.registerError = this.registerData.ErrorMessage;
              console.log('register success?: ' + this.isRegistered);
            },
            error => {console.log(error); },
            () => {if (this.isRegistered) {
              this.signupForm.reset();
              this.appService.customerID = this.registerData.CustomerID;
              this.registerDataClear();
              this.routeService.canAdvance();
              this.router.navigate(['/location']);
            } else {
              // TODO: add popup windows for error.
              console.log(this.registerError);
              this.registerDataClear();
            }});
        }
      }
      // register data clear after every register request
      registerDataClear() {
        this.registerData = null;
        this.isRegistered = false;
        this.registerError = null;
      }
      loginDataClear() {
        this.loginData = null;
        this.loginError = null;
      }
      displaySignUpMobile() {
        this.signupMobile = true;
        this.loginMobile = false;
      }
      displayLoginMobile() {
        this.loginMobile = true;
        this.signupMobile = false;
      }
    }
      // onSubmitLogin(postData, form: string) {
      //   let jsonData: any
    
      //   if (form == "login") {
      //     this.appService.endpoint = "http://127.0.0.1:5002/login"
          
      //     jsonData = {
      //       "LocationID": 38698,
      //       "Email": postData.loginEmail,
      //       "Password": postData.loginPassword,
      //       "client_id": "3WCCU4EY81os",
      //       "client_secret": "ppDcPjF9Ex2G"
      //     };
    
      //     this.appService.onPostLogin(jsonData);
      //     this.loginForm.reset();
    
      //     this.routeService.canAdvance();
      //     this.router.navigate(['/location']);
      //   }
      //   else {
      //     this.appService.endpoint = "http://127.0.0.1:5002/create";
    
      //     jsonData = {
      //       "Password": postData.signupPassword,
      //       "FirstName": postData.firstName,
      //       "LastName": postData.lastName,
      //       "CellPhone": postData.signupPhone,
      //       "Email": postData.signupEmail,
      //       "AllowReceiveEmails": true,
      //       "AllowReceivePromotionalEmails": true,
      //       "AllowReceiveSMS": true,
      //       "RequireCustomerPhone": true,
      //       "RequireCustomerAddress": true,
      //       "access_token": this.appService.access_token_user,
      //       "LocationID": 38698
      //     };
    
      //     this.appService.onPost(jsonData);
      //     this.signupForm.reset();
          
      //     this.routeService.canAdvance();
      //     this.router.navigate(['/location']);
      //   }
    // }
  