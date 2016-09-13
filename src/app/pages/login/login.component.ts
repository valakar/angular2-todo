import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './../../services';
import {PageComponent} from '../../components/page.component';
import {Store} from '@ngrx/store';

@Component({
    selector: 'login-page',
    styleUrls: ['./login.css'],
    templateUrl: './login.html',
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent extends PageComponent {
    login:string = '';

    constructor(private authService:AuthService,
                private router:Router,
                private store:Store<any>) {
        super(store, {});
    }

    onInit() {
    }

    onDestroy() {
    }

    logIn() {
        this._subscription(
            this.authService.logIn(this.login)
                .subscribe(res => {
                    if (res) {
                        this.router.navigate(['/list']);
                    }
                })
        );
    }
}
