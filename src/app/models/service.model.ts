export class ServiceItem {
    name: string;
    description: string;
    price: number;
    treatmentID: number;
    duration: number;

    constructor(name: string, description: string, price: number, treatmentID: number, duration: number){
        this.name = name;
        this.description = description;
        this.price = price;
        this.treatmentID = treatmentID;
        this.duration = duration;
    }
}
