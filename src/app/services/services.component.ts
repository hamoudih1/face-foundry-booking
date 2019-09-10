import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ServiceItem } from '../models/service.model';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { AddOn } from '../models/add-on.model';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit{

  treatmenst_array: any[];
  serviceItems: ServiceItem[];
  currentServiceItems: ServiceItem[] = [];

  serviceAddOns: string [] = [];

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.serviceItems = this.appService.serviceItems;
  }

  onSelect(serviceItem: ServiceItem) {

    if (this.currentServiceItems.includes(serviceItem)) {
      let index:number = 0;
      for(let i of this.currentServiceItems) {
        if(i.name == serviceItem.name) {
          this.currentServiceItems.splice(index,1);

          for(let addOn of serviceItem.addOns) {
            this.deleteAddOn(addOn);
          }
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
  
  selectAddOn(addOn: AddOn) {
    addOn.checked = !addOn.checked;

    if (addOn.checked == true) {
      this.serviceAddOns.push(addOn.addOn)
    }
    else {
      this.deleteAddOn(addOn)
    }
  }

  deleteAddOn(addOn: AddOn) {

    addOn.checked = false;

    let index: number = 0;

    for(let i of this.serviceAddOns) {
      if(i == addOn.addOn) {
          this.serviceAddOns.splice(index,1);
      }
      else {
          index ++;
      }
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
      this.router.navigate(['/staff']); 
    }
    else {
      //this.appService.reviewItem.service = this.currentServiceItems;

      //this.appService.endpoint = "http://127.0.0.1:5002/employees"

      //let locationID = this.appService.reviewItem.location.locationID;
      // let jsonData: any = {
      //   "LocationID": locationID,
      //   "access_token" : this.appService.access_token_user
      // };
      //this.appService.onPostServices(jsonData);
      this.appService.reviewItem.service = this.currentServiceItems;
      this.appService.reviewItem.serviceAddOns = this.serviceAddOns;
      this.router.navigate(['/staff']); 
      console.log(this.serviceAddOns);
      
    }
  }
}
