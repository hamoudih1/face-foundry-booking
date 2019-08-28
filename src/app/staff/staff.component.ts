import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { StaffItem } from '../models/staff.model';
import { AppService } from '../app.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  @ViewChild('selectStaff', {static: true}) selectStaff : ElementRef;

  staffNames: string[];

  showMessage: boolean = false;

  currentStaffItem: StaffItem = new StaffItem(null, null, false);

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.staffNames = this.appService.staffNames;
  }
  onSelectPeople(event: any) {
    this.currentStaffItem.people = event.target.value;
    if (this.currentStaffItem.people == "Group") {
      this.showMessage = true;
    }
    else {
      this.showMessage = false;
    }
  }
  onSelectStaff(event: any) {
    this.currentStaffItem.staffName = event.target.value;
    this.currentStaffItem.firstAvaiable = false;
  }
  onSelectAvailable() {
    this.currentStaffItem.staffName = null;
    this.currentStaffItem.firstAvaiable = true;
    this.selectStaff.nativeElement.value = "";
  }

  nextEnabled() {
    if(this.currentStaffItem == null) {
      return false;
    }
    else if(this.currentStaffItem.people == null || this.currentStaffItem.people == "" ||
      ((this.currentStaffItem.staffName == null || this.currentStaffItem.staffName == "") && 
      this.currentStaffItem.firstAvaiable == false)) {
      return false
    }
    else {
      return true;
    }
  }
  onSubmit() {
    console.log(this.currentStaffItem);
    this.appService.reviewItem.staff = this.currentStaffItem;
  }
}
