import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../models/user';
import 'rxjs/add/operator/map';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
    private apiUrl = 'http://localhost:3001/api/users/authenticate';

    // private apiUrl = 'http://10.10.201.100:8080/login';
    private res:any;
    private loggedIn = new BehaviorSubject<boolean>(this.hasToken()); // {1}    
    constructor(private http: HttpClient, private router: Router) { }
 
    login(user: User) {
        return this.http.post<any>(this.apiUrl, { username: user.userName, password: user.password })
         .map(user => {
            // login successful if there's a jwt token in the response
            if (user.userName && user.token) { 
                this.loggedIn.next(true);             
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.router.navigate(['/']);
            }

            return user;
        });
    }

    get isLoggedIn() {
        return this.loggedIn.asObservable(); // {2}
    }

    private hasToken() : boolean {
        var x = JSON.parse(localStorage.getItem('currentUser'));
        if (x) {
            var y = true;
        } else {
            y = false;
        }
        return y;
    }

    logout() {
        this.loggedIn.next(false);
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }
}
