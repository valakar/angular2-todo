import {Component, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import {TodoService, TodoItem} from './../../services';
import {FilterEnum} from './filterEnum';
import {AddItemComponent} from './add-item/add-item.component';
import {FiltersComponent} from './filters/filters.component';
import {ItemsListComponent} from './items-list/items-list.component';
import {Store, Action, combineReducers} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {AppActions} from '../../app.actions';
import {PageComponent} from '../../components/page.component';
import {todoListReducers} from './todo-list.reducers';

@Component({
    selector: 'todo-list',
    styleUrls: [
        './todo-list.css'
    ],
    encapsulation: ViewEncapsulation.None,
    template: `
        <h1>Todo List</h1>
        
        <div class="clock">Clock: {{time | date:'HH:mm:ss'}}</div>
        
        <filters [filter]="filter"
            (change)="setFilter($event)">
        </filters>
        
        <add-item [itemName]="itemName" (addItem)="addItem($event)">
        </add-item>
        
        <items-list [items]="filteredItems"
            (toggle)="toggleItem($event)"
            (delete)="deleteItem($event)">    
        </items-list>
    `,
    directives: [AddItemComponent, FiltersComponent, ItemsListComponent]
})
export class TodoList extends PageComponent {
    time:Date;
    itemName:string = 'New';
    filteredItems:TodoItem[];
    filter:FilterEnum;
    interval:any;

    constructor(private todoService:TodoService,
                private store:Store<any>,
                private appActions:AppActions) {
        super(store, todoListReducers);
    }

    onInit() {
        this._subscriptions([
            Observable.combineLatest(
                this.store.select('items'),
                this.store.select('filter'))
                .subscribe(([items, filter]:[TodoItem[], FilterEnum]) => {
                    this.filter = filter;
                    this.filteredItems = items.filter(i => {
                        return filter === FilterEnum.All
                            || i.isDone && filter === FilterEnum.Done
                            || !i.isDone && filter === FilterEnum.Undone
                    });
                }),

            this.store.select('time')
                .subscribe((time:Date) => this.time = time),
        ]);

        this.interval = setInterval(() => {
            this.appActions.dispatch(AppActions.SET_TIME, new Date());
        }, 1000);

        this.todoService.getTodoItems();
    }

    onDestroy() {
        clearInterval(this.interval);
    }

    addItem(name:string) {
        var newItem = new TodoItem(null, false, name, null, null);
        this.todoService.addItem(newItem);
        this.itemName = '';
    }

    deleteItem(delItem:TodoItem) {
        this.todoService.deleteItem(delItem);
    }

    toggleItem(item:TodoItem) {
        this.todoService.updateItem(Object.assign({}, item, {isDone: !item.isDone}));
    }

    setFilter(filter:FilterEnum) {
        this.appActions.dispatch(AppActions.SET_FILTER, filter);
    }
}
