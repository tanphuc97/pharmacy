import { AbstractControl, ValidatorFn } from '@angular/forms';

export function min(value: Number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const input = control.value, isValid = input < value;
        if (isValid) {
            return { 'min': { value } }
        }
        else {
            return null;
        }
    };
}