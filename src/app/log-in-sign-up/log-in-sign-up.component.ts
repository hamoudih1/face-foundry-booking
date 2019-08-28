import { Component, ViewChild, DoCheck } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-log-in-sign-up',
  templateUrl: './log-in-sign-up.component.html',
  styleUrls: ['./log-in-sign-up.component.css']
})
export class LogInSignUpComponent implements DoCheck {

  model: any = {};
  
  @ViewChild('loginForm', {static: true}) loginForm: NgForm;
  @ViewChild('signupForm', {static: true}) signupForm: NgForm;
  @ViewChild('signupPassword', {static: true}) signupPasswordEl: NgModel;
  @ViewChild('signupConfirmPassword', {static: true}) signupConfirmPasswordEl: NgModel;

  signupPassword;
  signupConfirmPassword;

  constructor() { }

  ngDoCheck() {
    this.signupPassword = this.signupPasswordEl;
    this.signupConfirmPassword = this.signupConfirmPasswordEl;
  }

  onSubmit(postData, form: string) {
    if (form == "login") {
      console.log(this.loginForm);
      this.loginForm.reset();
    }
    else {
      if(this.signupPassword.value === this.signupConfirmPassword.value) {
        console.log(this.signupForm);
        this.signupForm.reset();
      }
      else {
        console.log("passwords must match");
      }
    }
  }
}
