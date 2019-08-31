export class StaffItem {
    staffFirstName: string;
    staffLastName: string;
    staffGender: string;
    staffID: number;

    constructor(staffFirstName: string, staffLastName: string, staffGender: string,  staffID: number) {
        this.staffFirstName = staffFirstName;
        this.staffLastName = staffLastName;
        this.staffGender = staffGender;
        this.staffID = staffID;
    }
}
