import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'length'})
export class LengthPipe implements PipeTransform {
    transform(value:Array<any>):string {
        if (!value || !value.length) {
            return 'empty';
        }
        return value.length.toString();
    }
}