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
  reviewDate: Date;
  reviewTime: string;


  constructor(private appService: AppService) { }

  ngOnInit() {
    this.reviewItem = this.appService.reviewItem;
    this.reviewLocation = this.reviewItem.location.name;
    this.reviewService = this.reviewItem.service.name;
    this.reviewPeople = this.reviewItem.staff.people;
    this.reviewStaff = this.reviewItem.staff.staffName;
    this.reviewDate = this.reviewItem.date;
    this.reviewTime = this.reviewItem.time
  }

  onSubmit(){
    console.log(this.reviewItem);
    
  }

}
