export class StaffItem {
    staffName: string;
    people: string;
    firstAvaiable: boolean;

    constructor(staffName: string, people: string, firstAvailable: boolean) {
        this.staffName = staffName;
        this.people = people;
        this.firstAvaiable = firstAvailable;
    }
}
