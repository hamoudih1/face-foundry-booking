import { LocationItem } from './location.model';
import { ServiceItem } from './service.model';
import { StaffItem } from './staff.model';

export class ReviewItem {
    location: LocationItem;
    service: ServiceItem;
    staff: StaffItem;
    date: Date;
    time: string;

    constructor(location: LocationItem, service: ServiceItem, staff: StaffItem, date: Date, time: string) {
        this.location = location;
        this.service = service;
        this.staff = staff;
        this.date = date;
        this.time = time;
    }
}
