import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {TodoItem} from "./todoItem";
import {AppActions} from "../app.actions";

@Injectable()
export class TodoService {
    apiUrl: string = 'http://localhost:3333/todo/';

    constructor(private http: Http,
                private appActions: AppActions) {
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
            .subscribe(res => this.appActions.dispatch(AppActions.ITEMS_LOADED, res));
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
            .subscribe(res => this.appActions.dispatch(AppActions.ITEM_LOADED, res));
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
            .subscribe(res => this.appActions.dispatch(AppActions.ADD_ITEM, res));
    }

    updateItem(item: TodoItem) {
        var observable = this.http.put(this.apiUrl + item.id, item);
        observable.subscribe(res => this.appActions.dispatch(AppActions.UPDATE_ITEM, item));
        return observable;
    }

    deleteItem(item: TodoItem) {
        return this.http.delete(this.apiUrl + item.id)
            .subscribe(res => this.appActions.dispatch(AppActions.DELETE_ITEM, item));
    }
}
