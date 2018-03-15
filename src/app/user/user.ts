import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { PostService } from '../service/postlist.service';
import { NgStyle } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FancyImageUploaderOptions, UploadedFile } from 'ng2-fancy-image-uploader';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { DialogOverviewExampleDialog } from '../dialog/dialog-overview-example-dialog';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import * as _ from 'lodash';
/** @title Sidenav with custom escape and backdrop click behavior */

@Component({
  selector: 'user',
  templateUrl: './user.html'
  // styleUrls: ['sidenav-disable-close-example.css'],
})

export class User {
  @ViewChild('fileInput') fileInput;

  uri = 'http://localhost:3001/upload';
  coverUri = 'http://localhost:3001/upload/cover';

  USER = JSON.parse(localStorage.getItem('currentUser'));
  
  uploader:FileUploader = new FileUploader({
    url: this.uri,
    additionalParameter: {
      userName: this.USER.userName
    }
  });

  coverUploader:FileUploader = new FileUploader({
    url: this.coverUri,
    additionalParameter: {
      userName: this.USER.userName
    }
  });

  attachmentList:any = [];
  coverAttachmentList:any = [];
 
  user: any = {};
  posts: any[] = [];
  filesToUpload: Array<File> = [];
  promiseSetBySomeAction:any;

  constructor(
    private _formBuilder: FormBuilder, 
    private userService: UserService, 
    private postService: PostService,
    public dialog: MatDialog, 
    private http: Http) { 

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.attachmentList.push(JSON.parse(response));
      window.location.reload();
    }

    this.coverUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.coverAttachmentList.push(JSON.parse(response));
      window.location.reload();
    }
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

  addPost(post:any) {    
    let item = {
      postText: post
    }; 
    console.dir("i get called with post item ", item);
    if(!post){ 
      return; 
    } else {
      return this.promiseSetBySomeAction = this.postService.addPost(item, this.USER)
      .then(td => {
        this.user = td;
      });
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
        this.user = td;
      });
    }
  }

  addNewLike(post:any) {
    if(!post){ 
      return; 
    } else {
      if (_.includes(post.likedFrom, this.USER.userName)) {
        return this.promiseSetBySomeAction = this.postService.removeLike(post, this.USER)
        .then(td => {
          this.user.Posts = td;
        });
      } else {
        return this.promiseSetBySomeAction = this.postService.addNewLike(post, this.USER)
        .then(td => {
          this.user.Posts = td;
        });
      }        
    }
  }

  ngOnInit() {
    this.userService.getUser(this.USER.userName)
      .then( 
        user => this.user = user      
      );
  }
}
