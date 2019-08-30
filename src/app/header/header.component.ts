import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [ 
    trigger(
      'sideNav', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms ease-out', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('1000ms ease-in', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    ),
    trigger(
      'sideNavContainer', [
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('1000ms ease-in', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ]
})
export class HeaderComponent implements OnInit {

  sideNavToggle: boolean = false;
  isOpen: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleNav() {
    this.sideNavToggle = !this.sideNavToggle;
  }

  closeNav() {

    if(this.isOpen == true) {
      this.sideNavToggle = false;
      this.isOpen = false
    }

  }
}
