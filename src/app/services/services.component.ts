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
  currentServiceItem: ServiceItem = null;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.serviceItems = this.appService.serviceItems;
  }

  onSelect(serviceItem: ServiceItem) {
    this.currentServiceItem = serviceItem;
  }

  isActive(service: ServiceItem) {
    if(this.currentServiceItem != null) {
      return this.currentServiceItem.name == service.name;
    }
    else {
      return false;
    }
  }

  onSubmit() {
    if(this.currentServiceItem == null) {
      console.log("please select a service");
    }
    else {
      console.log(this.currentServiceItem);
      this.appService.reviewItem.service = this.currentServiceItem;
    }
  }
}
