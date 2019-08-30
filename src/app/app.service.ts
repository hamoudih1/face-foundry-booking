import { Injectable } from '@angular/core';
import { LocationItem } from './models/location.model';
import { ServiceItem } from './models/service.model';
import { StaffItem } from './models/staff.model';
import { ReviewItem } from './models/review.model';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  endpoint = "http://127.0.0.1:5002/start";
  user_token: any;

  access_token_welcome: string = '';
  access_token_user: string = '';

  locationItems: LocationItem[] = [new LocationItem("Edina", "3170 Galleria Edina, Minnesota 55435", "../assets/images/location-edina.jpg", 38698),
    new LocationItem("North Loop", "424 N Washington Ave Minneapolis, MN 55401", "../assets/images/location-north-loop.jpg", 38699)];

  serviceItems: ServiceItem[] = [new ServiceItem("Service Name 1", "Filler Description", "../assets/images/location-filler.jpg", 21),
    new ServiceItem("Service Name 2", "Filler Description", "../assets/images/location-filler.jpg", 34),
    new ServiceItem("Service Name 3", "Filler Description", "../assets/images/location-filler.jpg", 27)];

  staffNames: string[] = ["Name 1", "Name 2", "Name 3"];

  timeItems: string[] = ['3:00', '3:15', '3:30', '3:45', '4:00', '4:15', '4:30', '4:45', '5:00', '5:15', '5:30', '5:45', '6:00', '6:15', '6:30', '6:45', '7:00'];

  reviewItem: ReviewItem = new ReviewItem(null, [], null, null, null);

  constructor(private http: HttpClient) { }

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

}
