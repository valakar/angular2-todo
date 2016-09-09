import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './../services';

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private authService:AuthService,
                private router:Router) {
    }

    canActivate():boolean {
        var isLoggedIn = this.authService.isLoggedIn();
        if (!isLoggedIn) {
            this.router.navigate(['/login']);
        }
        return isLoggedIn;
    }
}
