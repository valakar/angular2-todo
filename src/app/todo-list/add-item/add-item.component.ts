import {Component, EventEmitter} from '@angular/core';

@Component({
    selector: 'add-item',
    templateUrl: './add-item.html',
    styleUrls: ['./add-item.css'],
    inputs: ['itemName'],
    outputs: ['addItem']
})

export class AddItemComponent {
    itemName:string;
    addItem:EventEmitter<string> = new EventEmitter<string>();

    add(text:string) {
        if (text) {
            this.addItem.emit(text);
            this.itemName = null;
        }
    }
}
