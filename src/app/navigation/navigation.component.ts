import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  currentURL : string;

  currentActive: number;

  constructor() { }

  ngOnInit() {
    this.checkPath();
  }

  checkPath(){
    this.currentURL = window.location.pathname;

    if(this.currentURL.includes("location")) {
      this.currentActive = 1;
    }
    else if(this.currentURL.includes("services")) {
      this.currentActive = 2;
    }
    else if(this.currentURL.includes("staff")) {
      this.currentActive = 3;
    }
    else if(this.currentURL.includes("date")) {
      this.currentActive = 4;
    }
    else if(this.currentURL.includes("time")) {
      this.currentActive = 5;
    }
    else if(this.currentURL.includes("review")) {
      this.currentActive = 6;
    }
    else if(this.currentURL.includes("payment")) {
      this.currentActive = 7;
    }
    else {
      this.currentActive = 0;
      console.log(this.currentURL);
      
    }
  }
}
