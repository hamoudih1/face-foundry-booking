import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { ServiceItem } from 'src/app/models/service.model';

@Component({
  selector: 'app-service-add-on',
  templateUrl: './service-add-on.component.html',
  styleUrls: ['./service-add-on.component.css']
})
export class ServiceAddOnComponent implements OnInit {

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
  }

}
