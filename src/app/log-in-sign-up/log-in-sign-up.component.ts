import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-log-in-sign-up',
  templateUrl: './log-in-sign-up.component.html',
  styleUrls: ['./log-in-sign-up.component.css']
})
export class LogInSignUpComponent implements OnInit {
  @ViewChild('loginForm', {static: true}) loginForm: NgForm;
  @ViewChild('signupForm', {static: true}) signupForm: NgForm;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(postData, form: string) {
    if (form == "login") {
      console.log(this.loginForm);
      this.loginForm.reset();
    }
    else {
      console.log(this.signupForm);
      this.signupForm.reset();
    }
  }
}
