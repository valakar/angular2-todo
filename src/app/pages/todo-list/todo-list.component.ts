import {Component, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import {TodoService, TodoItem} from './../../services';
import {FilterEnum} from './filterEnum';
import {AddItemComponent} from './add-item/add-item.component';
import {FiltersComponent} from './filters/filters.component';
import {ItemsListComponent} from './items-list/items-list.component';
import {Store, Action, combineReducers} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';

@Component({
    selector: 'todo-list',
    styleUrls: [
        './todo-list.css'
    ],
    encapsulation: ViewEncapsulation.None,
    template: `
        <h1>Todo List</h1>
        
        <div class="clock">Clock: {{time | async | date:'HH:mm:ss'}}</div>
        
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
export class TodoList {
    time:Observable<Object>; //Observable<Date>;
    itemName:string = 'New';
    filteredItems:TodoItem[];
    filter:FilterEnum;
    subscriptions:Subscription[] = [];
    interval:any;

    constructor(private todoService:TodoService,
                private store:Store<any>) {
    }

    ngOnInit() {
        this.initReducers();

        this.subscriptions.push(
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
                })
        );

        this.time = this.store.select('time');

        this.interval = setInterval(() => {
            this.store.dispatch({type: 'SET_TIME', payload: new Date()});
        });

        this.todoService.getTodoItems();
    }

    ngOnDestroy () {
        this.subscriptions.forEach(s => s.unsubscribe());
        clearInterval(this.interval);
    }

    initReducers() {
        this.store.replaceReducer(combineReducers({
            items: function(state = [], action) {
                switch (action.type) {
                    case 'ITEMS_LOADED':
                        return action.payload;

                    case 'ADD_ITEM':
                        return [
                            ...state,
                            action.payload
                        ];

                    case 'DELETE_ITEM':
                        return state.filter(i => i.id !== action.payload.id);

                    case 'UPDATE_ITEM':
                        return state.map(i => {
                            if (i.id === action.payload.id) {
                                return Object.assign({}, i, action.payload);
                            }
                            return i;
                        });

                    default: return state;
                }
            },
            filter: function(state = FilterEnum.All, action) {
                switch (action.type) {
                    case 'SET_FILTER':
                        return action.payload;
                    default: return state;
                }
            },
            time: function(state = new Date(), action) {
                switch (action.type) {
                    case 'SET_TIME':
                        return action.payload;
                    default: return state;
                }
            }
        }));

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
        this.store.dispatch({ type: 'SET_FILTER', payload: filter });
    }
}
