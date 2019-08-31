import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { StaffItem } from '../models/staff.model';
import { AppService } from '../app.service';
import { PeopleItem } from '../models/people.model';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  @ViewChild('selectStaff', {static: true}) selectStaff : ElementRef;

  staffItems: StaffItem[];

  showMessage: boolean = false;

  currentPeopleItem: PeopleItem = new PeopleItem(null, null, null, null, null, false);

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.staffItems = this.appService.staffItems;
    console.log(this.staffItems);
    
  }
  onSelectPeople(event: any) {
    this.currentPeopleItem.people = event.target.value;
    if (this.currentPeopleItem.people == "Group") {
      this.showMessage = true;
    }
    else {
      this.showMessage = false;
    }
  }
  onSelectStaff(event: any) {

    let json = JSON.parse(event.target.value);
    this.currentPeopleItem.staffFirstName = json['staffFirstName'];
    this.currentPeopleItem.staffLastName = json["staffLastName"];
    this.currentPeopleItem.staffGender = json["staffGender"];
    this.currentPeopleItem.staffID = json["staffID"];
    this.currentPeopleItem.firstAvaiable = false;
        
  }
  onSelectAvailable() {
    this.currentPeopleItem.staffFirstName = null;
    this.currentPeopleItem.staffLastName = null;
    this.currentPeopleItem.firstAvaiable = true;
    this.selectStaff.nativeElement.value = "";
  }

  nextEnabled() {
    if(this.currentPeopleItem == null) {
      return false;
    }
    else if(this.currentPeopleItem.people == null || this.currentPeopleItem.people == "" ||
      ((this.currentPeopleItem.staffFirstName == null || this.currentPeopleItem.staffFirstName == "") && 
      this.currentPeopleItem.firstAvaiable == false)) {
      return false
    }
    else {
      return true;
    }
  }
  onSubmit() {
    console.log(this.currentPeopleItem);
    this.appService.reviewItem.staff = this.currentPeopleItem;
  }
}
