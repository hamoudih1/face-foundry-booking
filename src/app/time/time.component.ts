import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {

  timeItems: string[];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.timeItems = this.appService.timeItems;
  }

}
