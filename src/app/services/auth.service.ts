import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    static LOGIN_KEY:string = 'login';

    logIn(login:string):Observable<boolean> {
        return Observable.create(observer => {

            setTimeout(() => {
                let result = (login !== 'wrong');
                if (result) {
                    localStorage.setItem(AuthService.LOGIN_KEY, login);
                }
                observer.next(result);
            }, 1000);

        });
    }

    isLoggedIn() {
        return !!localStorage.getItem(AuthService.LOGIN_KEY);
    }

    logOff(){
        localStorage.removeItem(AuthService.LOGIN_KEY);
    }
}
