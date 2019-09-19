import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormGroup } from '@angular/forms';

import { Phone } from './phone.validator';

@Directive({
    selector: '[phone]',
    providers: [{ provide: NG_VALIDATORS, useExisting: PhoneDirective, multi: true }]
})
export class PhoneDirective implements Validator {
    @Input('phone') phone: string[] = [];

    validate(formGroup: FormGroup): ValidationErrors {
        return Phone(this.phone[0])(formGroup);
    }
}

