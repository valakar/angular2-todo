import {Component, ViewEncapsulation} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "./../../services";

@Component({
    selector: 'login-page',
    styleUrls: ['./login.css'],
    templateUrl: './login.html',
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
    login: string = '';

    constructor(private authService: AuthService,
                private router: Router) {
    }

    logIn() {
        this.authService.logIn(this.login)
            .subscribe(res => {
                if (res) {
                    this.router.navigate(['/list']);
                }
            });
    }
}
