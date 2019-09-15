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

  // time info
    time_info: any;
    temp_time: Date;
    temp_hour: any;
    temp_minute: any;
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.get_time();
    
  }
  onSelect(time: string) {
    this.currentTime = time;    
  }
  isActive(time: string){
    if (this.currentTime == time) {
      return true;
    }
    else {
      return false;
    }
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

  // get time in select one day
  get_time() {
    this.appService.endpoint = "http://127.0.0.1:5002/time";
    this.appService.onGetTime().subscribe(
      reponseData => { 
        console.log(reponseData);
        // here return the first one
        // TODO: if muti return fixed, should fix here
        this.time_info = reponseData[0];
        let index = 0;
        while (this.time_info.locationHours[index]) {
          this.temp_time = new Date(this.time_info.locationHours[index].open);
          if (this.temp_time.getDate() + 1 != this.appService.reviewItem.date.day) {
            break;
          }
          this.temp_hour = this.temp_time.getHours();
          this.temp_minute = this.temp_time.getMinutes();
          this.appService.timeItems.push(('0' + (this.temp_hour)).slice(-2) + ': ' + ('0' + (this.temp_minute)).slice(-2));
          index++;
        }
      },
      error => {console.log(error); },
      () => {
        this.timeItems = this.appService.timeItems;
      } );
  }

}
