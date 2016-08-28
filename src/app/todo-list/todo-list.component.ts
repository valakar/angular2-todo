import {Component} from '@angular/core';
import {TodoService, TodoItem} from './../services/todo.service';
import {FilterEnum} from './filter-enum';
import {AddItemComponent} from './add-item';

@Component({
    selector: 'todo-list',
    styleUrls: [
        './todo-list.css'
    ],
    template: `
        <h1>Todo List</h1>
        
        <div class="clock">Clock: {{time}}</div>
        
        <div class="filters">
            <button [ngClass]="{'active': filter == FilterEnum.All}"
                (click)="setFilter(FilterEnum.All)">All</button>
            <button [ngClass]="{'active': filter == FilterEnum.Done}"
                (click)="setFilter(FilterEnum.Done)">Done</button>
            <button [ngClass]="{'active': filter == FilterEnum.Undone}"
                (click)="setFilter(FilterEnum.Undone)">Un-Done</button>
        </div>
        
        <add-item [itemName]="itemName" (addItem)="addItem($event)"></add-item>
        
        <div class="statistics">
            <span>items: {{getFilteredItems().length}}</span>
        </div>
        
        <div class="items">
            <div class="item" *ngFor="let item of getFilteredItems()">
                <input type="checkbox" [checked]="item.isDone"
                    (click)="toggleItem(item)"/>
                <a class="item-text" href="#/details"
                    [class.done-item]="item.isDone" >
                    {{item.text}}
                </a>
                <button class="item-del" (click)="deleteItem(item)">X</button>
            </div>
        </div>
    `,
    directives: [AddItemComponent]
})
export class TodoList {
    items:TodoItem[] = [];
    filteredItems:TodoItem[];
    time:string;
    itemName:string = 'New Todo Item';
    filter:FilterEnum = FilterEnum.All;
    FilterEnum:any = FilterEnum;

    constructor(private todoService:TodoService) {
    }

    ngOnInit() {
        this.items = this.todoService.getTodoItems();
        setInterval(() => this.time = new Date().getTime().toString(), 1000)
    }

    addItem(item) {
        this.items.push(new TodoItem(this.items.length, false, item, item, this.items.length * 10))
    }

    deleteItem(item:TodoItem) {
        this.items = this.items.filter(i => i !== item);
    }

    toggleItem(item:TodoItem) {
        item.isDone = !item.isDone;
    }

    setFilter(filter) {
        this.filter = filter;
    }

    getFilteredItems() {
        return this.items
            .filter(item =>
            this.filter === FilterEnum.All
            || item.isDone && this.filter === FilterEnum.Done
            || !item.isDone && this.filter === FilterEnum.Undone);
    }
}
