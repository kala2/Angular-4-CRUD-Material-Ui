import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
@Injectable()

export class UserService {

    private apiUrl = 'http://localhost:3001/api/user';
    public result: any;
    observable: Observable<any>;
    filesToUpload: Array<File> = [];

    constructor(private http: Http) { }

    getUser(user) {       
        return this.http.get(this.apiUrl + "/" + user)
                .toPromise()
                .then(this.handleData)
                .catch(this.handleError);
    }

    // addPost(item: any): Promise<any> {
    //     return this.http.post(this.apiUrl, item)        
    //     .toPromise()
    //     .then(this.handleData)
    //     .catch(this.handleError)
    // }

    // deletePost(postId: any):Promise<any> {
    //     return this.http
    //         .delete(this.apiUrl + "/" + postId)
    //         .toPromise()
    //         .then(this.handleData)
    //         .catch(this.handleError);
    // }

    // updatePost(post: any):Promise<any> {
    //     console.log("the postId is : ", post);
    //     return this.http
    //         .put(this.apiUrl + "/" + post._id, post)
    //         .toPromise()
    //         .then(this.handleData)
    //         .catch(this.handleError);
    // }

    // // getPost(postId:string): Promise<any>{
    // //     return this.http.get(this.apiUrl + "/" + postId)
    // //                     .toPromise()
    // //                     .then(this.handleData)
    // //                     .catch(this.handleError)
    // //   }

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
