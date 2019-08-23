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
    console.log(postData);
    if (form == "login") {
      this.loginForm.reset();
    }
    else {
      this.signupForm.reset();
    }
  }
}
