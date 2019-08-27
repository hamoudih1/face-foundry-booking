import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../app.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  currentDate: NgbDate = null;

  constructor(private appService: AppService) { }

  ngOnInit() {
  }
  onSubmit() {
    if(this.currentDate == null) {
      console.log("please pick a date");
    }
    else {
      this.appService.reviewItem.date = this.currentDate;
      console.log(this.currentDate);
    }
  }
}
