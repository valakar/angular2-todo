import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        './app.style.css'
    ],
    template: `
    <header>
        ToDo Application Header
    </header>
    
    <main>
        <router-outlet></router-outlet>
    </main>

    <footer>
        Footer 2016 
    </footer>
  `
})
export class App {
    constructor() {
    }

    ngOnInit() {
    }
}

