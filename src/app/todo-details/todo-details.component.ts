import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TodoService, TodoItem} from './../services/todo.service'
import {Subscription} from 'rxjs';

@Component({
    selector: 'todo-details',
    styleUrls: [
        './todo-details.css'
    ],
    template: `
        <h1>Todo Details</h1>
        
        <form novalidate *ngIf="item">
        
            <div class="item-id">
                {{item.id}}
            </div>
        
            <div class="form-control">
                <label class="item-done">
                    <input type="checkbox" name="isDone" [(ngModel)]="item.isDone" />
                    Is Done
                </label>
                
                <span *ngIf="item.isDone">=> Yeey!</span>
            </div>
            
            <div class="form-control">
                <label class="item-text">
                    Text:
                    <input type="text" name="text" [(ngModel)]="item.text" required />
                </label>
            </div>
            
            <div class="form-control">
                <label class="item-description">
                    Description:
                    <textarea name="description" [(ngModel)]="item.description" required></textarea>
                </label>
            </div>
            
            <div class="form-control">
                <label class="item-time">
                    Time:
                    <input type="text" name="time" [(ngModel)]="item.time" required />
                </label>
            </div>
            
            <button type="submit">Save</button>
            <button (click)="back($event)">Back To List</button>
        </form>
        
    `
})
export class TodoDetails implements OnInit, OnDestroy {
    item:TodoItem;
    sub:Subscription;

    constructor(private todoService:TodoService,
                private activatedRoute:ActivatedRoute,
                private router:Router) {
    }

    ngOnInit() {
        this.sub = this.activatedRoute.params
            .subscribe(params => {

                let itemId = +params['id'];
                this.todoService.getItem(itemId)
                    .subscribe(res => {
                        this.item = res;
                    });

            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    back($event) {
        this.router.navigate(['' /*, params */]);
        $event.preventDefault();
    }
}
