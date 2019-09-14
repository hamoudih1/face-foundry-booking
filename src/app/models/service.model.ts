import { AddOn } from './add-on.model';

export class ServiceItem {
    name: string;
    description: string;
    price: number;
    treatmentID: number;
    duration: number;
    addOns = new Array<AddOn>();

    constructor(name: string, description: string, price: number, treatmentID: number, duration: number,
                addOns: AddOn[]) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.treatmentID = treatmentID;
        this.duration = duration;
        this.addOns = addOns;
    }
}
