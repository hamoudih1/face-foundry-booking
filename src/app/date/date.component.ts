import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../app.service';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  model: NgbDate;
  dates_array: string[];
  dates_list: NgbDate[] = [];
  firstDate: NgbDate = new NgbDate(0, 0, 0);
  lastDate: NgbDate = new NgbDate(0, 0, 0);
  

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.dates_array = this.appService.dates_array;

    this.getDateList(this.dates_array);
    this.setDates(this.dates_list);
  }

  getDateList(dates_array: string[]) {

    let dates_list: NgbDate[] = [];
    let currentDate: NgbDate = new NgbDate(0, 0, 0);

    for(let item of dates_array) {
      currentDate.year =  parseInt(item.substring(0,4));
      currentDate.day =  parseInt(item.substring(8,10));
      currentDate.month =  parseInt(item.substring(5,7));

      dates_list.push(currentDate);
    
      currentDate =  new NgbDate(0, 0, 0);
    }

    this.dates_list = dates_list    
  }

  setDates(dates_list: NgbDate[]) {

    let dates_list_copy = dates_list.slice();
    this.firstDate = dates_list_copy.shift();
    this.lastDate = dates_list_copy.pop();
  }


  onSubmit() {
    // if(this.model == new NgbDate(0, 0, 0)) {
    //   console.log("please pick a date");
    // }
    // else {
    //   this.appService.reviewItem.date = this.model;
    //   console.log(this.model);
    // }
    this.appService.reviewItem.date = this.model;
    this.router.navigate(['/time']); 
  }
}
