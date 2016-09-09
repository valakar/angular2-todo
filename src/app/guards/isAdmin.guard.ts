import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from './../services';

@Injectable()
export class IsAdminGuard implements CanActivate {
    constructor(private authService:AuthService) {
    }

    canActivate():boolean {
        //return this.authService.isInRole(Roles.Admin);
        return true;
    }
}