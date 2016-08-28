import {Component} from '@angular/core';
import {TodoService, TodoItem} from './../services/todo.service';

@Component({
    selector: 'todo-details',
    styleUrls: [
        './todo-details.css'
    ],
    template: `
        <h1>Todo Details</h1>
        
        <form novalidate>
        
            <div class="form-control">
                <label class="item-done">
                    <input type="checkbox" />
                    Is Done
                </label>
            </div>
            
            <div class="form-control">
                <label class="item-name">
                    Name:
                    <input type="text" required />
                </label>
            </div>
            
            <div class="form-control">
                <label class="item-description">
                    Description:
                    <textarea required></textarea>
                </label>
            </div>
            
            <div class="form-control">
                <label class="item-done">
                    Time:
                    <input type="text" required />
                </label>
            </div>
            
            <button type="submit">Save</button>
       
        </form>
        
    `
})
export class TodoDetails {
    constructor(private todoService:TodoService) {
    }

    ngOnInit() {
    }
}
