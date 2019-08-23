import { Component, OnInit, Input } from '@angular/core';
import { ServiceItem } from 'src/app/models/service.model';

@Component({
  selector: 'app-service-item',
  templateUrl: './service-item.component.html',
  styleUrls: ['./service-item.component.css']
})
export class ServiceItemComponent implements OnInit {

  @Input('serviceItem') serviceItem: ServiceItem;

  constructor() { }

  ngOnInit() {
  }

}
