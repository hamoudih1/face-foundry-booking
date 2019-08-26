import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../app.service';
import { LocationItem } from '../models/location.model';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  locationItems: LocationItem[];

  currentLocationItem: LocationItem = null;

  constructor(private appService: AppService) { }

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
      console.log(this.currentLocationItem);
      this.appService.reviewItem.location = this.currentLocationItem;
    }
  }

}
