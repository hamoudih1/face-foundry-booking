import { Component, OnInit, Input } from '@angular/core';
import { LocationItem } from 'src/app/models/location.model';

@Component({
  selector: 'app-location-item',
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.css']
})
export class LocationItemComponent implements OnInit {
  @Input('locationItem') locationItem: LocationItem;

  constructor() { }

  ngOnInit() {
  }

}
