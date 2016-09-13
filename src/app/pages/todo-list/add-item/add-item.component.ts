import {Component, EventEmitter, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'add-item',
    styleUrls: [
        './add-item.css'
    ],
    templateUrl: './add-item.html',
    inputs: ['itemName'],
    outputs: ['addItem'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddItemComponent {
    itemName:string;
    addItem:EventEmitter<string> = new EventEmitter<string>();

    add(name:string) {
        this.addItem.emit(name);
        this.itemName = '';
    }
}
