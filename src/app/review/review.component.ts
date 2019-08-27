import { Component, OnInit } from '@angular/core';
import { ReviewItem } from '../models/review.model';
import { AppService } from '../app.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  reviewItem: ReviewItem;

  reviewLocation: string;
  reviewService: string;
  reviewPeople: string;
  reviewStaff: string;
  reviewDate: NgbDate;
  reviewTime: string;

  displayDate: string;


  constructor(private appService: AppService) { }

  ngOnInit() {
    this.reviewItem = this.appService.reviewItem;

    if(this.reviewItem == null ||
      this.reviewItem.location == null ||
      this.reviewItem.service == null,
      this.reviewItem.staff == null,
      this.reviewItem.date == null,
      this.reviewItem.time == null) {

      this.reviewLocation = null;
      this.reviewService = null;
      this.reviewPeople = null;
      this.reviewStaff = null
      this.reviewTime = null;

      this.displayDate = null;
    }
    else {
      this.reviewLocation = this.reviewItem.location.name;
      this.reviewService = this.reviewItem.service.name;
      this.reviewPeople = this.reviewItem.staff.people;
      this.reviewStaff = this.reviewItem.staff.staffName;
      this.reviewDate = this.reviewItem.date;
      this.reviewTime = this.reviewItem.time;

      this.displayDate = this.reviewDate.month + "-" + this.reviewDate.day + "-" + this.reviewDate.year;
    }    
  }

  onSubmit(){
    console.log(this.reviewItem);
  }
}
