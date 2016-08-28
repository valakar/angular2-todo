import {Component, EventEmitter} from '@angular/core';
import {TodoService, TodoItem} from './../../services/todo.service';
import {TodoItemComponent} from './todo-item/todo-item.component';

@Component({
    selector: 'items-list',
    template: `
       <div class="statistics">
           <span>items: {{items.length}}</span>
       </div>
        
       <div class="items">
            <todo-item *ngFor="let item of items" 
                [item]="item"
                (delete)="delete.emit(item)"
                (toggle)="toggle.emit(item)">
            </todo-item>
        </div>
    `,
    inputs: ['items'],
    outputs: ['toggle', 'delete'],
    directives:[TodoItemComponent]
})
export class ItemsListComponent {
    items:TodoItem[];
    toggle:EventEmitter<TodoItem> = new EventEmitter<TodoItem>();
    delete:EventEmitter<TodoItem> = new EventEmitter<TodoItem>();
}
