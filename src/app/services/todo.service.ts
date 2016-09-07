import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {TodoItem} from './todoItem';

@Injectable()
export class TodoService {
    apiUrl:string = 'http://localhost:3333/todo/';

    constructor(private http:Http) {
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
            });
    }

    getItem(id:number) {
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
            });
    }

    addItem(item:TodoItem) {
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
            });
    }

    updateItem(item:TodoItem) {
        return this.http.put(this.apiUrl + item.id, item);
    }

    deleteItem(item:TodoItem) {
        return this.http.delete(this.apiUrl + item.id);
    }
}
