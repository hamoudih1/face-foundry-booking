import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        // return null if controls haven't initialised yet
        if (!control || !matchingControl) {
          return null;
        }

        // return null if another validator has already found an error on the matchingControl
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return null;
        }

        // set error on matchingControl if validation fails
        if (control.value.length < 8 || control.value.length > 25) {
            control.setErrors({ mustMatch: true });
        } 
        else if (!control.value.includes("0") &&
            !control.value.includes("1") &&
            !control.value.includes("2") &&
            !control.value.includes("3") &&
            !control.value.includes("4") &&
            !control.value.includes("5") &&
            !control.value.includes("6") &&
            !control.value.includes("7") &&
            !control.value.includes("8") &&
            !control.value.includes("9")){
            control.setErrors({ mustMatch: true });
        } 

        else if (!control.value.includes("a") &&
            !control.value.includes("b") && 
            !control.value.includes("c") &&
            !control.value.includes("d") &&
            !control.value.includes("e") &&
            !control.value.includes("f") &&
            !control.value.includes("g") &&
            !control.value.includes("h") &&
            !control.value.includes("i") &&
            !control.value.includes("j") &&
            !control.value.includes("k") &&
            !control.value.includes("l") && 
            !control.value.includes("m") &&
            !control.value.includes("n") &&
            !control.value.includes("o") &&
            !control.value.includes("p") &&
            !control.value.includes("q") &&
            !control.value.includes("r") &&
            !control.value.includes("s") &&
            !control.value.includes("t") &&
            !control.value.includes("u") && 
            !control.value.includes("p") &&
            !control.value.includes("w") &&
            !control.value.includes("x") &&
            !control.value.includes("y") &&
            !control.value.includes("z") &&
            !control.value.includes("A") &&
            !control.value.includes("B") && 
            !control.value.includes("C") &&
            !control.value.includes("D") &&
            !control.value.includes("E") &&
            !control.value.includes("F") &&
            !control.value.includes("G") &&
            !control.value.includes("H") &&
            !control.value.includes("I") &&
            !control.value.includes("J") &&
            !control.value.includes("K") &&
            !control.value.includes("L") && 
            !control.value.includes("M") &&
            !control.value.includes("N") &&
            !control.value.includes("O") &&
            !control.value.includes("P") &&
            !control.value.includes("Q") &&
            !control.value.includes("R") &&
            !control.value.includes("S") &&
            !control.value.includes("T") &&
            !control.value.includes("U") && 
            !control.value.includes("P") &&
            !control.value.includes("W") &&
            !control.value.includes("X") &&
            !control.value.includes("Y") &&
            !control.value.includes("Z")){
            control.setErrors({ mustMatch: true });
        } 
       
        else if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } 
        else {
            control.setErrors(null);
            matchingControl.setErrors(null);
        }
    }
}