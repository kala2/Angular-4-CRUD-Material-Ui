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

@Injectable()


/** @title Sidenav with custom escape and backdrop click behavior */
@Component({
  selector: 'postlist',
  templateUrl: './postlist.html'
  // styleUrls: ['sidenav-disable-close-example.css'],
})

export class PostList {

  title = 'app';
  posts: any[] = [];
  post:any = {};
  postId:any = {};
  promiseSetBySomeAction:any;
  private postItem;

  constructor(private postService: PostService, public dialog: MatDialog) {  }

  addPost(post:any) {
    
      if(!post){ 
        return; 
      } else {
        return this.promiseSetBySomeAction = this.postService.addPost(post)
        .then(td => {
          console.log(td);
          this.posts.push(td.post);
        });
      }
  }

  deletePost(post:any) {

    if(!post){ 
      return; 
    } else {
      return this.promiseSetBySomeAction = this.postService.deletePost(post._id)
      .then(td => {
        console.log(td._id);
        const filteredPosts = this.posts.filter(t => t._id !== td._id);
        this.posts = filteredPosts;
      })
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