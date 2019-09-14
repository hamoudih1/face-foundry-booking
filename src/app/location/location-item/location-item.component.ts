import { Component, OnInit, Input } from '@angular/core';
import { LocationItem } from 'src/app/models/location.model';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { RouteService } from 'src/app/route.service';

@Component({
  selector: 'app-location-item',
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.css']
})
export class LocationItemComponent implements OnInit {
  @Input('locationItem') locationItem: LocationItem;
  @Input('active') active: boolean = false;


  constructor() { }

  ngOnInit() {
  }
}
