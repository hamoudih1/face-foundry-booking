import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {

  timeItems: string[];
  currentTime: string = null;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.timeItems = this.appService.timeItems;
  }
  onSelect(time: string) {
    this.currentTime = time;    
  }
  onSubmit() {
    if(this.currentTime == null){
      console.log("please select a time");
    }
    else {
      console.log(this.currentTime);
      this.appService.reviewItem.time = this.currentTime;
    }
  }
}
