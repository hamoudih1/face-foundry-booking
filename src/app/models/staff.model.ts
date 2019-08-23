export class StaffItem {
    staffName: string;
    people: number;
    firstAvaiable: boolean;

    constructor(staffName: string, people: number, firstAvailable: boolean) {
        this.staffName = staffName;
        this.people = people;
        this.firstAvaiable = firstAvailable;
    }
}
