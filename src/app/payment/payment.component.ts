import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @ViewChild('paymentForm', {static : true}) paymentForm: NgForm;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.paymentForm);
  }
}
