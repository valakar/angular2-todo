import {Directive, ElementRef, HostListener, OnInit, OnDestroy} from '@angular/core';

@Directive({
    selector: '[only-numbers]'
})
export class OnlyNumbersDirective implements OnInit, OnDestroy {
    constructor(private el:ElementRef) {
        console.log('OnlyNumbersDirective');
    }

    @HostListener('keypress', ['$event']) onKeyPress($event) {
        var key = $event.keyCode || $event.which;
        key = String.fromCharCode(key);
        var regex = /[0-9]|\./;
        if (!regex.test(key)) {
            $event.preventDefault();
        }
    }

    ngOnInit() {
        //this.el.nativeElement.removeEventListener('keypress', this.onKeyPress);
    }

    ngOnDestroy() {
        //this.el.nativeElement.removeEventListener('keypress', this.onKeyPress);
    }
}
