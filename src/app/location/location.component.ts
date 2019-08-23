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

  onSubmit(){
    if(this.currentLocationItem == null){
      console.log("please select a location");
    }
    else {
      console.log(this.currentLocationItem);
      this.appService.reviewItem.location = this.currentLocationItem;
    }
  }

}
