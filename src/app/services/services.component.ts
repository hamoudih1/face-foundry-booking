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

  treatmenst_array = new Array<any>();
  temp_treatment: any;
  temp_addon: any;
  temp_addon_array: AddOn[] = new Array<AddOn>();
  serviceItems: ServiceItem[];
  currentServiceItems: ServiceItem[] = [];

  serviceAddOns: string [] = [];

  // serviceInfo
  serviceInfo: any;
  treatmentItems: any;

  // addOnsInfo
  addonInfo: any;
  addonItems: any;

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.get_service();
    // this.serviceItems = this.appService.serviceItems;
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
      // request to get current service addOn
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

  get_service() {
    const jsonData: any = {
      "LocationID": this.appService.reviewItem.location.locationID,
      "access_token": this.appService.access_token_user
    };
    this.appService.onPostServices(jsonData).subscribe(reponseData => {
      console.log(reponseData);
      this.serviceInfo = reponseData;
      if (this.serviceInfo.IsSuccess) {
        this.treatmentItems = this.serviceInfo.Treatments;
        let index = 0;
        while (this.treatmentItems[index]) {
          if (index >= 16) {
            break;
          }
          this.temp_treatment = this.treatmentItems[index];
          this.get_service_addOns(this.temp_treatment.ID);
          this.treatmenst_array.push(new ServiceItem(this.temp_treatment.Name,
            this.temp_treatment.Description, this.temp_treatment.Price.Amount,
            this.temp_treatment.ID, this.temp_treatment.TreatmentDuration, this.temp_addon_array));
          index++;
        }
        console.log(this.treatmenst_array);
        // TODO: iterate over treatmentItems.
      } else {
        // TODO: call unsuccessfully
      }
    },
      error => { console.log(error); },
      () => {
        this.serviceItems = this.treatmenst_array; });
  }

  get_service_addOns(serviceId: number) {
    console.log('addon start');
    this.appService.onGetServicesAddons(serviceId).subscribe(
      reponseData => {
        console.log(reponseData);
        this.addonInfo = reponseData;
        this.addonItems = this.addonInfo.Treatments;
        let index = 0;
        while (this.addonItems[index]) {
          this.temp_addon = this.addonItems[index];
          this.temp_addon_array.push(new AddOn(this.temp_addon.Name, false));
          index++;
        }
       },
      error => {console.log(error); },
      () => {});
    }
  }
