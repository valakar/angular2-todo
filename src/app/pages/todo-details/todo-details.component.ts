import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TodoService, TodoItem} from './../../services';
import {notEqualValidator} from './../../validators/notEqualValidator';
import {ErrorSummaryComponent, SummaryError} from './../../components/error-summary';
import {Store, Action, combineReducers} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';

@Component({
    selector: 'todo-details',
    styleUrls: [
        './todo-details.css'
    ],
    directives: [ErrorSummaryComponent],
    template: `
        <h1>Todo Details</h1>
        
        <error-summary [errors]="formErrors">
        </error-summary>
        
        <form novalidate *ngIf="item" 
            [formGroup]="todoForm"
            (ngSubmit)="onSubmit()">
        
            <div class="item-id">
               Id:  {{item.id}}
            </div>
        
            <div class="form-control">
                <label class="item-done">
                    <input type="checkbox" formControlName="isDone"/>
                    Is Done
                </label>
                
                <span *ngIf="todoForm.controls.isDone.value">=> Yeey!</span>
            </div>
            
            <div class="form-control">
                <label class="item-text">
                    Text:
                    <input type="text" formControlName="text" />
                </label>
                <div *ngIf="todoForm.controls.text.hasError('required')" class="error">
                    * required
                </div>
                <div *ngIf="todoForm.controls.text.hasError('minlength')" class="error">
                    * minlength - should be at least 5 symbols
                </div>
                <div *ngIf="todoForm.controls.text.hasError('pattern')" class="error">
                    * pattern - only letters and numbers
                </div>
            </div>
            
            <div class="form-control">
                <label class="item-description">
                    Description:
                    <textarea formControlName="description"></textarea>
                    <div *ngIf="todoForm.controls.description.hasError('required')" class="error">
                        * required
                    </div>
                    <div *ngIf="todoForm.controls.description.hasError('notEqual')" class="error">
                        * notEqual - write something meaningful goat!
                    </div>
                </label>
            </div>
            
            <div class="form-control">
                <label class="item-time">
                    Time:
                    <input type="text" formControlName="time" only-numbers />
                    <div *ngIf="todoForm.controls.time.hasError('required')" class="error">
                        * required
                    </div>
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
    todoForm:FormGroup;
    formErrors:any;
    subscriptions:Subscription[] = [];

    constructor(private todoService:TodoService,
                private activatedRoute:ActivatedRoute,
                private router:Router,
                private fb:FormBuilder,
                private store:Store<any>) {
    }

    ngOnInit() {
        this.initReducers();

        this.subscriptions.push(
            this.activatedRoute.params
                .subscribe(params => {
                    let itemId = +params['id'];
                    this.todoService.getItem(itemId)
                })
        );

        this.subscriptions.push(
            this.store.select('item')
                .subscribe((item:TodoItem) => {
                    this.item = item;
                    // Form data and validation
                    this.initializeForm();
                })
        );
    }

    ngOnDestroy () {
        this.subscriptions.forEach(s => s.unsubscribe());
    }


    initReducers() {
        this.store.replaceReducer(combineReducers({
            item: function(state, action) {
                switch (action.type) {
                    case 'ITEM_LOADED':
                        return action.payload;
                    default: return state;
                }
            }
        }));
    }

    initializeForm() {
        var self = this;

        if(!this.item) {
            this.todoForm = this.fb.group({});
            return;
        }

        this.todoForm = this.fb.group({
            'id': [
                this.item.id
            ],
            'isDone': [
                this.item.isDone
            ],
            'text': [
                this.item.text,
                [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.pattern('[A-Za-z0-9]+')
                ]
            ],
            'description': [
                this.item.description,
                [
                    Validators.required,
                    notEqualValidator(() => {
                        var textControl = self.todoForm.controls['text'];
                        if (textControl) {
                            return textControl.value;
                        }
                    })
                ],
            ],
            'time': [
                this.item.time,
                [
                    Validators.required
                ]
            ]
        });
    }

    back($event) {
        if (this.todoForm.dirty) {
            if (confirm('Do you want to leave without save?')) {
                this.gotoList();
            }
        }
        else {
            this.gotoList();
        }
        $event.preventDefault();
    }

    onSubmit() {
        console.log(this.todoForm);

        this.formErrors = [];

        if (this.todoForm.valid) {
            let updatedItem = Object.assign({}, this.item, this.todoForm.value);
            
            this.subscriptions.push(
                this.todoService.updateItem(updatedItem)
                    .subscribe(res => {
                        this.gotoList();
                    })
            );
        }
        else {
            this.showErrorSummary();
        }

        return false;
    }

    showErrorSummary() {
        for (var ctrlName in this.todoForm.controls) {
            let ctrl = this.todoForm.controls[ctrlName];
            if (ctrl.errors) {
                this.formErrors.push(new SummaryError(
                    ctrlName,
                    JSON.stringify(ctrl.errors)
                ));
            }
        }
    }

    gotoList() {
        this.router.navigate(['' /*, params */]);
    }
}
