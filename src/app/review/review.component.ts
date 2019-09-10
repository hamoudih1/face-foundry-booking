import { Component, OnInit } from '@angular/core';
import { ReviewItem } from '../models/review.model';
import { AppService } from '../app.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ServiceItem } from '../models/service.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  reviewItem: ReviewItem;

  reviewLocation: string;
  reviewServices: string;
  reviewServiceAddOns: string;
  reviewPeople: string;
  reviewStaff: string;
  reviewDate: NgbDate;
  reviewTime: string;

  displayDate: string;

  incomplete: boolean = true;


  constructor(private appService: AppService) { }

  ngOnInit() {
    this.reviewItem = this.appService.reviewItem;

    if(this.reviewItem == null ||
      this.reviewItem.location == null ||
      this.reviewItem.service == [] ||
      this.reviewItem.serviceAddOns == [] ||
      this.reviewItem.staff == null ||
      this.reviewItem.date == null ||
      this.reviewItem.time == null) {

      this.reviewLocation = null;
      this.reviewServices = null;
      this.reviewServiceAddOns = null;
      this.reviewPeople = null;
      this.reviewStaff = null
      this.reviewTime = null;

      this.displayDate = null;
      this.incomplete = true;
    }
    else {
      this.reviewLocation = this.reviewItem.location.name;
      this.reviewServices = this.extractServices(this.reviewItem.service);
      this.reviewServiceAddOns = this.extractServiceAddOns(this.reviewItem.serviceAddOns);
      this.reviewPeople = this.reviewItem.staff.people;
      this.reviewStaff = this.reviewItem.staff.staffFirstName + " " + this.reviewItem.staff.staffLastName;
      this.reviewDate = this.reviewItem.date;
      this.reviewTime = this.reviewItem.time;

      this.displayDate = this.reviewDate.month + "-" + this.reviewDate.day + "-" + this.reviewDate.year;
      this.incomplete = false;
    }    
  }

  onSubmit(){
    console.log(this.reviewItem);
  }

  extractServices(serviceItems: ServiceItem[]) {

    let serviceString: string = "";

    for(let item of serviceItems) {
      if(serviceString == "") {
        serviceString = serviceString + item.name;
      }
      else {
        serviceString = serviceString + ", " + item.name;
      }
    }

    return serviceString;
  }

  extractServiceAddOns(addOns: string[]) {

    let addOnString: string = "";

    for(let item of addOns) {
      if(addOnString == "") {
        addOnString = addOnString + item;
      }
      else {
        addOnString = addOnString + ", " + item;
      }
    }

    return addOnString;
  }
}
