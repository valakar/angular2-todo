import {Component} from '@angular/core';
import {SummaryError} from './summary-error';

@Component({
    selector: 'error-summary',
    styleUrls: [
        './error-summary.css'
    ],
    template: `
        <ul class="error-summary" *ngIf="errors?.length">
           <li *ngFor="let error of errors">
                <b>{{error.controlName}}</b>: <i>{{error.errorText}}</i>
           </li>
        </ul>
    `,
    inputs: ['errors']
})
export class ErrorSummaryComponent {
    errors:SummaryError[];
}
