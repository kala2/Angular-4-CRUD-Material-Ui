import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/toPromise';
@Injectable()

export class PostService {
    private apiUrl: string;
    public result: any;
    observable: Observable<any>;
    constructor(private http: Http) { }


    getPosts() {
        this.apiUrl = 'http://localhost:3001/api';
        return this.http.get(this.apiUrl)
                .toPromise()
                .then(this.handleData)
                .catch(this.handleError);
    }

    addPost(item: any, USER: any): Promise<any> {
        this.apiUrl = 'http://localhost:3001/api';
        return this.http.post(this.apiUrl + "/" + USER.userName, item)        
        .toPromise()
        .then(this.handleData)
        .catch(this.handleError)
    }

    addNewLike(post: any, username: any, USER: any): Promise<any> {
        this.apiUrl = 'http://localhost:3001/api/addNewLike';

        var forSend = {
            post: post,
            likerUserName: USER.userName
        }

        return this.http
            .put(this.apiUrl + "/" + username, forSend)
            .toPromise()
            .then(this.handleData)
            .catch(this.handleError)
    }

    removeLike(post: any, username: any, USER: any): Promise<any> {
        this.apiUrl = 'http://localhost:3001/api/removeLike';

        var forSend = {
            post: post,
            likerUserName: USER.userName
        }

        return this.http
            .put(this.apiUrl + "/" + username, forSend)
            .toPromise()
            .then(this.handleData)
            .catch(this.handleError)
    }

    deletePost(post: any, USER: any):Promise<any> {
        this.apiUrl = 'http://localhost:3001/api/commentRemove';
        return this.http
            .put(this.apiUrl + "/" + USER.userName, post)
            .toPromise()
            .then(this.handleData)
            .catch(this.handleError);
    }

    updatePost(post: any, USER: any):Promise<any> {
        this.apiUrl = 'http://localhost:3001/api';
        return this.http
            .put(this.apiUrl + "/" + USER.userName, post)
            .toPromise()
            .then(this.handleData)
            .catch(this.handleError);
    }

    private handleData(res: any) {
       const body = res.json();
       // console.log("the body is ", body); // for development purposes only
       return body || {};
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for development purposes only
        return Promise.reject(error.message || error);
    }
}
