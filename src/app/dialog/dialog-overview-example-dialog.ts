import { Component, Inject } from '@angular/core';
import { PostService } from '../service/postlist.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})

export class DialogOverviewExampleDialog {
  promiseSetBySomeAction:any;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    private postService: PostService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
 
  onNoClick(): void {
    this.dialogRef.close();
  }

  onUpdateClick(post: any) {
    if(!post){ 
      return; 
    } else {
      return this.promiseSetBySomeAction = this.postService.updatePost(post);
    }
  }

}