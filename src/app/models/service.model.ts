export class ServiceItem {
    name: string;
    description: string;
    imgURL: string;
    price: number;

    constructor(name: string, description: string, imgURL: string, price: number){
        this.name = name;
        this.description = description;
        this.imgURL = imgURL;
        this.price = price;
    }
}
