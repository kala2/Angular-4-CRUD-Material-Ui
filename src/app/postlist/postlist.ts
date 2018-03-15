import { Component, OnInit, Inject } from '@angular/core';
import { PostService } from '../service/postlist.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Angular2PromiseButtonModule } from 'angular2-promise-buttons/dist';
import { DialogOverviewExampleDialog } from '../dialog/dialog-overview-example-dialog';
import { Observable } from 'rxjs/Rx';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import * as _ from 'lodash';

@Injectable()

/** @title Sidenav with custom escape and backdrop click behavior */
@Component({
  selector: 'postlist',
  templateUrl: './postlist.html'
  // styleUrls: ['sidenav-disable-close-example.css'],
})

export class PostList {
  USER = JSON.parse(localStorage.getItem('currentUser'));
  title = 'app';
  posts: any[] = [];
  x: any[] = [];
  post: any = {};
  postId: any = {};
  liked: boolean = false;
  promiseSetBySomeAction:any;
  clicked: boolean = false;
  private postItem;

  constructor(private postService: PostService, public dialog: MatDialog) {  }

  addNewLike(post:any, username: any) {
    if(!post){ 
      return; 
    } else {
      console.log("post is : ", post);
      console.log("username is : ", username);

      if (_.includes(post.likedFrom, this.USER.userName)) {
        return this.promiseSetBySomeAction = this.postService.removeLike(post, username, this.USER)
        .then(td => {
          for (let i in this.posts) {
            if (this.posts[i].userName == username) {
              console.log("i am in and found match", this.posts[i].userName);
              this.posts[i].Posts = td;
            }
          }
        });
      } else {
        return this.promiseSetBySomeAction = this.postService.addNewLike(post, username, this.USER)
        .then(td => {
          for (let i in this.posts) {
            if (this.posts[i].userName == username) {
              console.log("i am in and found match", this.posts[i].userName);
              this.posts[i].Posts = td;
            }
          }
        });
      }        
    }
  }

  deletePost(post:any) {
    if(!post){ 
      return; 
    } else {
      var i = 0;
      var temp1 = [];
      var temp2 = [];
      return this.promiseSetBySomeAction = this.postService.deletePost(post, this.USER)
      .then(td => {
        for (let i in this.posts) {
          if (this.posts[i].userName == this.USER.userName) {
            console.log("i am in and found match", this.posts[i].userName);
            this.posts[i].Posts = td;
          }
        }
      });
    }
  }

  getPosts() {
      this.postService.getPosts()
      .then(posts => this.posts = posts.posts.reverse());
  }

  openDialog(post:any): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
      data: post
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
      this.postService.getPosts()
      .then(posts => this.posts = posts.posts.reverse());
  }
}

// getPost(post:any){
  //   return this.promiseSetBySomeAction = this.postService.getPost(post._id)
  //     .then(td => {
  //       console.log("the td is: ", td[0].postText);
  //       this.post = td;
  //       console.log("the post is: ", this.post[0].postText);
  //     })
  // }

  // editPost(post:any) {

  //   if(!post){ 
  //     return; 
  //   } else {
  //     return this.promiseSetBySomeAction = this.postService.editPost(post._id)
  //     .then(td => {
  //       console.log(td._id);
  //       const updatedPosts = this.posts.map(t => {
  //         if(td._id !== t._id){
  //           return t;
  //         }
  //         return { ...t, ...td };
  //       })
  //       this.posts = updatedPosts;
  //     })
  //   }
  // }

  // filter(t => t._id !== td._id);