import {Component, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {TodoService, TodoItem} from './../../../../services';

@Component({
    selector: 'todo-item',
    styleUrls: [
        './todo-item.css'
    ],
    template: `
        <div class="item">
            <input type="checkbox" (click)="toggle.emit(item)" 
                [checked]="item.isDone"
                [attr.data-id]="item.id" />
                
            <a class="item-text" href="#/details/{{item.id}}"
               [class.done-item]="item.isDone">
               {{item.text}}
            </a>
            
            <button class="item-del" (click)="delete.emit(item)">X</button>
        </div>
    `,
    inputs: ['item'],
    outputs: ['toggle', 'delete'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent {
    item:TodoItem;
    toggle:EventEmitter<TodoItem> = new EventEmitter<TodoItem>();
    delete:EventEmitter<TodoItem> = new EventEmitter<TodoItem>();
}
