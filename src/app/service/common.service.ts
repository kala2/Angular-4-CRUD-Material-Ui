import { Injectable } from '@angular/core';
// import { PostList } from '../postlist/postlist.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CommonService {
    // public postList: PostList[];
    public add_subject = new Subject();

    constructor() {
        // this.postList = [];
    }

    addPost(item) {
        // this.postList.push(new PostList(item, false));
        this.add_subject.next();
    }
}
