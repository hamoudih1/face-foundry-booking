export class LocationItem {
    name: string;
    address: string;
    imgURL: string;
    locationID: number;

    constructor(name: string, address: string, imgURL: string, locationID: number) {
        this.name = name;
        this.address = address;
        this.imgURL = imgURL;
        this.locationID = locationID;
    }
}
