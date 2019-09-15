import { Injectable } from '@angular/core';
import { LocationItem } from './models/location.model';
import { ServiceItem } from './models/service.model';
import { StaffItem } from './models/staff.model';
import { ReviewItem } from './models/review.model';
import { HttpClient, HttpHeaders, HttpParams, } from '@angular/common/http';
import { Router } from '@angular/router';
import { AddOn } from './models/add-on.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {


  endpoint = "http://127.0.0.1:5002/start";
  user_token: any;

  //access tokens
  access_token_welcome: string = '';
  access_token_user: string = '';

  //employees data based on location
  staff_json: any;
  staff_array: any[] = [];

  //dates based on employee
  dates_json: any;
  dates_array: any[] = [];

  //Saved data
  //locations
  locationItems: LocationItem[] = [];

  //list of services
  serviceItems: ServiceItem[];

  // list of staff
  staffItems: StaffItem[] = new Array <StaffItem>();

  timeItems: string[] = new Array<string>();

  reviewItem: ReviewItem = new ReviewItem(null, [], [], null, null, null);

  // customer
  customerID: number;

  constructor(private http: HttpClient, private router: Router) { }

  // Communications with server
  getConfig() {
    return this.http.get(this.endpoint);
  }
  // onPost(postData: {}){
  //   this.http.post(this.endpoint, postData)
  //     .subscribe(responseData => {
  //       this.registerData = responseData;
  //       this.isRegistered = this.registerData.IsSuccess;
  //       console.log('register success?: ' + this.isRegistered);
  //     });
  // }
  onPost(postData: {}) {
    return this.http.post(this.endpoint, postData);
  }
  onPostLogin(postData: {}) {
    return this.http.post(this.endpoint, postData);
  }
  postlocation() {
    const postData = {access_token: this.access_token_user};
    return this.http.post(this.endpoint, postData);
  }
  onPostServices(postData: {}) {
    return this.http.post(this.endpoint, postData);
  }

  onGetServicesAddons(serviceId: number) {
    const addon_endpoint = "http://127.0.0.1:5002/addon";
    const postData = { id: serviceId, access_token: this.access_token_user};
    return this.http.post(addon_endpoint, postData);
  }

  OnPostEmployee(postData: {}) {
    return this.http.post(this.endpoint, postData);
  }

  onGetDate() {
    const treatment_id = new Array<any>();
    let index = 0;
    while (this.reviewItem.service[index]) {
      treatment_id.push(this.reviewItem.service[index].treatmentID);
      index++;
    }
    const postData = {
      LocationId: this.reviewItem.location.locationID,
      // set as from step 1 to 30
      fromDateTime: "2019-09-01T00:00:00-07:00",
      toDate: "2019-09-30T00:00:00-07:00",
      access_token: 'bear ' + this.access_token_welcome,
      employeeId: this.reviewItem.staff.staffID,
      serviceId: treatment_id
    };
    return this.http.post(this.endpoint, postData);
  }

  // send request to get time in one day
  onGetTime() {
    const treatment_id = new Array<any>();
    let index = 0;
    while (this.reviewItem.service[index]) {
      treatment_id.push(this.reviewItem.service[index].treatmentID);
      index++;
    }
    const postData = {
      LocationId: this.reviewItem.location.locationID,
      fromDateTime: this.reviewItem.date,
      access_token: 'bear ' + this.access_token_welcome,
      employeeId: this.reviewItem.staff.staffID,
      serviceId: treatment_id
      };
    return this.http.post(this.endpoint, postData);
  }

  // onPostStaff(postData: {}){
  //   this.http.post(this.endpoint, postData)
  //     .subscribe(responseData => {
  //       console.log(responseData);
  //       this.dates_json = responseData;
  //       this.dates_array = this.dates_json['0']['serviceCategories']['0']['services']['0']['availability'];
  //       this.router.navigate(['/date']);
  //     });
  // }

  onPostPayment(postData: {}) {
    return this.http.post(this.endpoint, postData);
  }

  // // retrieving the services 
  // getServices(treatments: any[]){
  //   let serviceItem: ServiceItem = new ServiceItem(null, null, null, null, null, []);
  //   let serviceItems: ServiceItem[] = [];
    
  //   for(let item of treatments){
      
  //     serviceItem.name = item["Name"];
  //     serviceItem.description = item["Description"];
  //     serviceItem.price = item["Price"]["Amount"];
  //     serviceItem.treatmentID = item["ID"];
  //     serviceItem.duration = item["TreatmentDuration"];

  //     serviceItems.push(serviceItem);
  //     serviceItem = new ServiceItem(null, null, null, null, null, []);
  //   }
  //   this.serviceItems = serviceItems;
  // }

  // // retrieving the staff
  // getEmployees(employees: any[]){
  //   let staffItem: StaffItem = new StaffItem(null, null, null, null);
  //   let staffItems: StaffItem[] = [];
    
  //   for(let item of employees){
      
  //     staffItem.staffFirstName = item["FirstName"];
  //     staffItem.staffLastName = item["LastName"];
  //     staffItem.staffGender = item["Gender"]["Name"];
  //     staffItem.staffID = item["ID"]
      
  //     staffItems.push(staffItem);
  //     staffItem = new StaffItem(null, null, null, null);
  //   }
  //   this.staffItems = staffItems;
  // }
}
