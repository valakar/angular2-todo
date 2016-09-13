import {Component, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {FilterEnum} from "./../filterEnum";

@Component({
    selector: 'filters',
    styleUrls:[
        './filters.css'
    ],
    template: `
       <div class="filters">
            <button [ngClass]="{'active': filter == FilterEnum.All}"
                (click)="change.emit(FilterEnum.All)">All</button>
      
            <button [ngClass]="{'active': filter == FilterEnum.Done}"
                (click)="change.emit(FilterEnum.Done)">Done</button>
                
            <button [ngClass]="{'active': filter == FilterEnum.Undone}"
                (click)="change.emit(FilterEnum.Undone)">Undone</button>
                
                
            <!--<button 
                *ngFor="let enumValue of [FilterEnum.All, FilterEnum.Done, FilterEnum.Undone]" -->
                <!--[ngClass]="{'active': filter == enumValue}"-->
                <!--(click)="change.emit(enumValue)">{{FilterEnum[enumValue]}}</button>-->
        </div>
    `,
    inputs: ['filter'],
    outputs: ['change'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent {
    filter:FilterEnum;
    FilterEnum:any = FilterEnum;
    change:EventEmitter<FilterEnum> = new EventEmitter<FilterEnum>();
}
