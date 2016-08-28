import {Component} from '@angular/core';

@Component({
    selector: 'todo-list',
    styles: [`
  
    `],
    template: `
        <h1>Todo List</h1>
        <div class="items">
            {{items.length}}
            <div class="item" *ngFor="let item of items">
                {{item.text}}
            </div>
        </div>
    `
})
export class TodoList {
    text:string = 'items';
    items:any[];

    constructor() {
        this.items = [
            {id: 1, text:'aaa'},
            {id: 2, text:'sss'},
            {id: 3, text:'ddd'}
        ];
    }
}
