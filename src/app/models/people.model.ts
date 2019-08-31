export class PeopleItem {
    staffFirstName: string;
    staffLastName: string;
    staffGender: string;
    staffID: number;
    people: string;
    firstAvaiable: boolean;

    constructor(staffFirstName: string, staffLastName: string, staffGender: string,  staffID: number, people: string, firstAvailable: boolean) {
        this.staffFirstName = staffFirstName;
        this.staffLastName = staffLastName;
        this.staffGender = staffGender;
        this.staffID = staffID;
        this.people = people;
        this.firstAvaiable = firstAvailable;
    }
}
