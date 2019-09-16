import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../app.service';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

declare var $: any;

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

  // date info
  date_reponse: any;
  current_item: any;
  current_category: any;
  current_service: any;
  current_date: any;
  current_day: any;
  isGetDate: boolean;

  // Available arry
  available_array = new Array<number>();

  isDisabled = (date: NgbDate, current: { month: number }) => !this.available_array.includes(date.day);
  

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.get_date();

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

    this.dates_list = dates_list;    
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

  get_date() {
    this.appService.endpoint = "http://127.0.0.1:5002/availabledates"
    this.appService.onGetDate().subscribe(
      // TODO: I don't know how to show the available date
      reponse => {
        console.log(reponse);
        this.date_reponse = reponse;
        let array_index = 0;
        while (this.date_reponse[array_index]) {
          this.current_item = this.date_reponse[array_index];
          let category_index = 0;
          while (this.current_item.serviceCategories[category_index]) {
            this.current_category = this.current_item.serviceCategories[category_index];
            let service_inedx = 0;
            while (this.current_category.services[service_inedx]) {
              this.current_service = this.current_category.services[service_inedx];
              let date_index = 0;
              while (this.current_service.availability[date_index]) {
                this.current_date = this.current_service.availability[date_index].split('-');
                this.current_day = parseInt(this.current_date[2], 10);
                this.available_array.push(this.current_day);
                date_index++;
              }
              service_inedx++;
            }
            category_index++;
          }
          array_index++;
        }
       },
      error => {console.log(error); },
      () => { this.isGetDate = true; }
    );
  }

}
