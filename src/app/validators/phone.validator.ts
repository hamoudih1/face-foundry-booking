import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function Phone(controlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];

        // return null if controls haven't initialised yet
        if (!control) {
          return null;
        }

        // return null if another validator has already found an error on the matchingControl
        if (control.errors && !control.errors.phone) {
            return null;
        }

        if (control.value.length == 10) {
            control.setErrors(null);
        }

        else {
            control.setErrors({ phone: true });
        }
    }
}