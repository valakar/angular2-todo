import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {TodoItem} from "./todoItem";
import {Store} from "@ngrx/store";

@Injectable()
export class TodoService {
    apiUrl: string = 'http://localhost:3333/todo/';

    constructor(private http: Http,
                private store: Store<any>) {
    }

    getTodoItems() {
        return this.http.get(this.apiUrl)
            .map(res => {
                return res.json().map(i => new TodoItem(
                    i.id,
                    i.isDone,
                    i.text,
                    i.description,
                    i.time
                ));
            })
            .subscribe(res => this.store.dispatch({type: 'ITEMS_LOADED', payload: res}));
    }

    getItem(id: number) {
        return this.http.get(this.apiUrl + id)
            .map(res => {
                var i = res.json();
                return new TodoItem(
                    i.id,
                    i.isDone,
                    i.text,
                    i.description,
                    i.time
                );
            })
            .subscribe(res => this.store.dispatch({type: 'ITEM_LOADED', payload: res}));
    }

    addItem(item: TodoItem) {
        return this.http.post(this.apiUrl, item)
            .map(res => {
                var i = res.json();
                return new TodoItem(
                    i.id,
                    i.isDone,
                    i.text,
                    i.description,
                    i.time
                );
            })
            .subscribe(res => this.store.dispatch({type: 'ADD_ITEM', payload: res}));
    }

    updateItem(item: TodoItem) {
        var observable = this.http.put(this.apiUrl + item.id, item);
        observable.subscribe(res => this.store.dispatch({type: 'UPDATE_ITEM', payload: item}));
        return observable;
    }

    deleteItem(item: TodoItem) {
        return this.http.delete(this.apiUrl + item.id)
            .subscribe(res => this.store.dispatch({type: 'DELETE_ITEM', payload: item}));
    }
}
