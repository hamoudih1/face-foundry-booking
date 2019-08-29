import { Component, OnInit } from '@angular/core';
import { ServiceItem } from '../models/service.model';
import { AppService } from '../app.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  serviceItems: ServiceItem[];
  currentServiceItems: ServiceItem[] = [];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.serviceItems = this.appService.serviceItems;
  }

  onSelect(serviceItem: ServiceItem) {
    if (this.currentServiceItems.includes(serviceItem)) {
      let index:number = 0;
      for(let i of this.currentServiceItems) {
        if(i.name == serviceItem.name) {
          this.currentServiceItems.splice(index,1);
        }
        else {
          index ++;
        }
      }
    }
    else {
      this.currentServiceItems.push(serviceItem);
    }
  }

  isActive(serviceItem: ServiceItem) {
    if(this.currentServiceItems != []) {
      return this.currentServiceItems.includes(serviceItem);
    }
    else {
      return false;
    }
  }

  onSubmit() {
    if(this.currentServiceItems == []) {
      console.log("please select a service");
    }
    else {
      console.log(this.currentServiceItems);
      this.appService.reviewItem.service = this.currentServiceItems;
    }
  }
}
