import { Component, OnInit } from '@angular/core';
import { StaffItem } from '../models/staff.model';
import { AppService } from '../app.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  staffNames: string[];

  currentStaffItem: StaffItem = new StaffItem(null, null, false);

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.staffNames = this.appService.staffNames;
  }
  onSelectNumber(numberOfPeople: number) {
    this.currentStaffItem.people = numberOfPeople;
  }
  onSelectStaff(staffName: string) {
    this.currentStaffItem.staffName = staffName;
    this.currentStaffItem.firstAvaiable = false;
  }
  onSelectAvailable() {
    this.currentStaffItem.staffName = null;
    this.currentStaffItem.firstAvaiable = true;
  }
  onSubmit() {
    if (this.currentStaffItem.people == null || 
      (this.currentStaffItem.staffName == null && this.currentStaffItem.firstAvaiable == false)) {
        console.log("please enter required info");
      }
    else {
      console.log(this.currentStaffItem);
      this.appService.reviewItem.staff = this.currentStaffItem;
    }
  }
}
