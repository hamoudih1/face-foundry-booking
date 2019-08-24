import { Component, OnInit } from '@angular/core';
import { ReviewItem } from '../models/review.model';
import { AppService } from '../app.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  reviewItem: ReviewItem;

  reviewLocation: string;
  reviewService: string;
  reviewPeople: number;
  reviewStaff: string;
  reviewDate: string;
  reviewTime: string;


  constructor(private appService: AppService) { }

  ngOnInit() {
    this.reviewItem = this.appService.reviewItem;

    if(this.reviewItem == null) {
      this.reviewLocation = null;
      this.reviewService = null;
      this.reviewPeople = null;
      this.reviewStaff = null
      this.reviewTime = null;
    }
    else {
      this.reviewLocation = this.reviewItem.location.name;
      this.reviewService = this.reviewItem.service.name;
      this.reviewPeople = this.reviewItem.staff.people;
      this.reviewStaff = this.reviewItem.staff.staffName;
      this.reviewDate = this.reviewItem.date.toDateString();
      this.reviewTime = this.reviewItem.time;

      console.log(this.reviewDate);
    }    
  }

  onSubmit(){
    console.log(this.reviewItem);
    
  }

}
