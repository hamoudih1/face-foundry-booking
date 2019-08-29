import { LocationItem } from './location.model';
import { ServiceItem } from './service.model';
import { StaffItem } from './staff.model';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export class ReviewItem {
    location: LocationItem;
    service: ServiceItem[];
    staff: StaffItem;
    date: NgbDate;
    time: string;

    constructor(location: LocationItem, service: ServiceItem[], staff: StaffItem, date: NgbDate, time: string) {
        this.location = location;
        this.service = service;
        this.staff = staff;
        this.date = date;
        this.time = time;
    }
}
