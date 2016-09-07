import {FormControl} from '@angular/forms';

export function notEqualValidator(getValueToCheck:()=>any) {

    // Validator
    return function (ctrl:FormControl) {
        var valueThatShouldNotBeEqual = getValueToCheck();

        if(valueThatShouldNotBeEqual === ctrl.value) {
            return {
                notEqual: {
                    valid: false
                }
            }
        }

        return null;
    }
}