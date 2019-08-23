import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  currentDate: Date = null;

  constructor(private appService: AppService) { }

  ngOnInit() {
  }
  onSubmit() {
    if(this.currentDate== null) {
      console.log("please pick a date");
    }
    else {
      console.log(this.currentDate);
      this.appService.reviewItem.date = this.currentDate;
    }
  }
}
