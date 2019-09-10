import { Injectable } from '@angular/core';
import { LocationItem } from './models/location.model';
import { ServiceItem } from './models/service.model';
import { StaffItem } from './models/staff.model';
import { ReviewItem } from './models/review.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
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

  //Treatments data based on location
  treatments_json: any;
  treatments_array: any[] = [];

  //employees data based on location
  staff_json: any;
  staff_array: any[] = [];

  //dates based on employee
  dates_json: any;
  dates_array: any[] = [];

  //Saved data
  //locations
  locationItems: LocationItem[] = [new LocationItem("Edina", "3170 Galleria Edina, Minnesota 55435", "../assets/images/location-edina.jpg", 38698),
    new LocationItem("North Loop", "424 N Washington Ave Minneapolis, MN 55401", "../assets/images/location-north-loop.jpg", 38699)];

  //list of services
  serviceItems: ServiceItem[] = [new ServiceItem("Manicure", "Service Description", 10, 11111, 30, [new AddOn("Nails", false), new AddOn("Polish", false), new AddOn("Painting", false)]),
    new ServiceItem("Hair", "Service Description", 12, 11112, 50, [new AddOn("Style", false), new AddOn("Cut", false), new AddOn("Dye", false)]),
    new ServiceItem("Pedicure", "Service Description", 14, 11113, 70, [new AddOn("Pedi 1", false), new AddOn("Pedi 2", false), new AddOn("Pedi 3", false)])];

  // list of staff
  staffItems: StaffItem[] = [new StaffItem("Bill", "Jones", "Male", 11111), new StaffItem("Jessica", "Smith", "Female", 11112), new StaffItem("Dana", "Hill", "Female", 11113)];

  timeItems: string[] = ['3:00', '3:15', '3:30', '3:45', '4:00', '4:15', '4:30', '4:45', '5:00', '5:15', '5:30', '5:45', '6:00', '6:15', '6:30', '6:45', '7:00'];

  reviewItem: ReviewItem = new ReviewItem(null, [], [], null, null, null);

  constructor(private http: HttpClient, private router: Router) { }

  // Communications with server
  getConfig() {
    return this.http.get(this.endpoint);
  }
  onPost(postData: {}){
    this.http.post(this.endpoint, postData)
      .subscribe(responseData => {
        console.log(responseData);
      });
  }
  onPostLogin(postData: {}){
    this.http.post(this.endpoint, postData)
      .subscribe(responseData => {
        console.log(responseData);
        this.user_token = responseData;
        this.access_token_user = this.user_token.access_token;
      });
  }
  onPostLocation(postData: {}){
    this.http.post(this.endpoint, postData)
      .subscribe(responseData => {
        console.log(responseData);
        this.treatments_json = responseData;
        this.treatments_array = this.treatments_json["Treatments"];
        this.getServices(this.treatments_array);  
        this.router.navigate(['/services']);
      });
  }
  onPostServices(postData: {}){
    this.http.post(this.endpoint, postData)
      .subscribe(responseData => {
        console.log(responseData);
        this.staff_json = responseData;
        this.staff_array = this.staff_json["Results"];
        this.getEmployees(this.staff_array);
        this.router.navigate(['/staff']);
      });
  }

  onPostStaff(postData: {}){
    this.http.post(this.endpoint, postData)
      .subscribe(responseData => {
        console.log(responseData);
        this.dates_json = responseData;
        this.dates_array = this.dates_json['0']['serviceCategories']['0']['services']['0']['availability'];
        this.router.navigate(['/date']);
      });
  }

  // retrieving the services 
  getServices(treatments: any[]){
    let serviceItem: ServiceItem = new ServiceItem(null, null, null, null, null, []);
    let serviceItems: ServiceItem[] = [];
    
    for(let item of treatments){
      
      serviceItem.name = item["Name"];
      serviceItem.description = item["Description"];
      serviceItem.price = item["Price"]["Amount"];
      serviceItem.treatmentID = item["ID"];
      serviceItem.duration = item["TreatmentDuration"];

      serviceItems.push(serviceItem);
      serviceItem = new ServiceItem(null, null, null, null, null, []);
    }
    this.serviceItems = serviceItems;
  }

  // retrieving the staff
  getEmployees(employees: any[]){
    let staffItem: StaffItem = new StaffItem(null, null, null, null);
    let staffItems: StaffItem[] = [];
    
    for(let item of employees){
      
      staffItem.staffFirstName = item["FirstName"];
      staffItem.staffLastName = item["LastName"];
      staffItem.staffGender = item["Gender"]["Name"];
      staffItem.staffID = item["ID"]
      
      staffItems.push(staffItem);
      staffItem = new StaffItem(null, null, null, null);
    }
    this.staffItems = staffItems;
  }
}
