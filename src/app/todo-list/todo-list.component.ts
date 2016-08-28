import {Component, ViewEncapsulation} from '@angular/core';
import {TodoService, TodoItem} from './../services/todo.service';
import {FilterEnum} from './filterEnum';
import {ItemsListComponent} from './items-list/items-list.component';
import {FiltersComponent} from './filters/filters.component';
import {AddItemComponent} from './add-item/add-item.component';

@Component({
    selector: 'todo-list',
    styleUrls: [
        './todo-list.css'
    ],
    encapsulation:ViewEncapsulation.None,
    template: `
        <h1>Todo List</h1>
        
        <div class="clock">Clock: {{time}}</div>
        
        <filters [filter]="filter" (change)="setFilter($event)">
        </filters>
        
        <add-item [itemName]="itemName" (addItem)="addItem($event)">
        </add-item>
        
        <items-list [items]="getFilteredItems()"
            (toggle)="toggleItem($event)"
            (delete)="deleteItem($event)">    
        </items-list>
    `,
    directives:[ItemsListComponent, FiltersComponent, AddItemComponent]
})
export class TodoList {
    time:string;
    itemName:string = 'New Item';
    items:TodoItem[] = [];
    filter:FilterEnum = FilterEnum.All;
    FilterEnum:any = FilterEnum;
    
    constructor(private todoService:TodoService) {
    }

    ngOnInit() {
        this.items = this.todoService.getTodoItems();

        setInterval(()=> {
            this.time = new Date().getSeconds().toString();
        }, 100);
    }

    addItem(name:string) {
        this.items.push(new TodoItem(0, false, name, null, null));
    }

    deleteItem(delItem:TodoItem) {
        this.items = this.items.filter(item => item !== delItem);
    }

    toggleItem(item:TodoItem) {
        item.isDone = !item.isDone;
    }

    setFilter(filter:FilterEnum) {
        this.filter = filter;
    }

    getFilteredItems() {
        return this.items.filter(item => {
            return this.filter === FilterEnum.All
                || item.isDone && this.filter === FilterEnum.Done
                || !item.isDone && this.filter === FilterEnum.Undone;
        });
    }
}
