import {FormControl} from '@angular/forms';

export function notEqualValidator(ctrl:FormControl) {
    if (ctrl.value === 'abc') {
        return {
            notEqual: {
                abc: false
            }
        };
    }

    return null;
}