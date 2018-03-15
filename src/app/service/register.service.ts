import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class RegisterService {
    public result: any;
    observable: Observable<any>;

    private apiUrl = 'http://localhost:3001/api/users/register';
    //for SpringBoot
    // private apiUrl = 'http://10.10.201.100:8080/api/register';
    
    constructor(private http: Http) { }

    register(user: any) {
        console.log("user is : ", user);
       
        return this.http.post(this.apiUrl, user)
        .toPromise()
        .then(this.handleData)
        .catch(this.handleError);

    }

    private handleData(res: any) {
       const body = res.json();
       console.log(body); // for development purposes only
       return body || {};
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for development purposes only
        return Promise.reject(error.message || error);
    }
}
