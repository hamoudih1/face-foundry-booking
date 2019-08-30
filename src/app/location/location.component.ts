import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../app.service';
import { LocationItem } from '../models/location.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  access_token_user: string;

  locationItems: LocationItem[];

  currentLocationItem: LocationItem = null;

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() { 
    this.locationItems = this.appService.locationItems;

  }

  onSelect(location: LocationItem){
    this.currentLocationItem = location;
  }

  isActive(location: LocationItem) {
    if(this.currentLocationItem != null) {
      return this.currentLocationItem.name == location.name;
    }
    else {
      return false;
    }
  }

  onSubmit(){
    if(this.currentLocationItem == null){
      console.log("Please select a location");
    }
    else {
      this.appService.reviewItem.location = this.currentLocationItem;

      this.appService.endpoint = "http://127.0.0.1:5002/treatments";

      let jsonData: any = {
        "LocationID": this.appService.reviewItem.location.locationID,
        "access_token" : this.appService.access_token_user
      };

      this.appService.onPostLocation(jsonData);
    }
  }
}
