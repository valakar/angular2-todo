import {Component, ViewEncapsulation} from '@angular/core';
import {TodoService, TodoItem} from './../services/todo.service';
import {FilterEnum} from './filterEnum';
import {AddItemComponent} from './add-item/add-item.component';
import {FiltersComponent} from './filters/filters.component';
import {ItemsListComponent} from './items-list/items-list.component';

@Component({
    selector: 'todo-list',
    styleUrls: [
        './todo-list.css'
    ],
    encapsulation:ViewEncapsulation.None,
    template: `
        <h1>Todo List</h1>
        <!-- json date date:'hh:mm:ss' uppercase decimal currency -->
        <div class="clock">Clock: {{time | date:'hh:mm:ss'}}</div>
        
        <filters [filter]="filter"
            (change)="setFilter($event)">
        </filters>
        
        <add-item [itemName]="itemName" (addItem)="addItem($event)">
        </add-item>
        
        <items-list [items]="getFilteredItems()"
            (toggle)="toggleItem($event)"
            (delete)="deleteItem($event)">    
        </items-list>
    `,
    directives: [AddItemComponent, FiltersComponent, ItemsListComponent]
})
export class TodoList {
    time:Date; // pipe
    itemName:string = 'New';
    items:TodoItem[] = [];
    filter:FilterEnum = FilterEnum.All;
    FilterEnum:any = FilterEnum;
    
    constructor(private todoService:TodoService) {
    }

    ngOnInit() {
        this.todoService.getTodoItems()
            .subscribe(res => {
                this.items = res;
            });

        setInterval(()=> {
            this.time = new Date(); // pipe
        }, 100);
    }

    addItem(name:string) {
        var newItem = new TodoItem(null, false, name, null, null);

        this.todoService.addItem(newItem)
            .subscribe(item => {
                this.items.push(item);
                this.itemName = '';
            });
    }

    deleteItem(delItem:TodoItem) {
        this.todoService.deleteItem(delItem)
            .subscribe(res => {
                this.items = this.items.filter(item => item !== delItem);
            });
    }

    toggleItem(item:TodoItem) {
        this.todoService.updateItem(Object.assign({}, item, {isDone: !item.isDone}))
            .subscribe(res => {
                item.isDone = !item.isDone;
            });
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
