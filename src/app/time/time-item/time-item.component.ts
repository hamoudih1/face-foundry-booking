import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-time-item',
  templateUrl: './time-item.component.html',
  styleUrls: ['./time-item.component.css']
})
export class TimeItemComponent implements OnInit {

  @Input('timeItem') timeItem;

  constructor() { }

  ngOnInit() {
  }

}
