// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-postlist',
//   templateUrl: './postlist.component.html',
//   styleUrls: ['./postlist.component.css']
// })
// export class PostListComponent implements OnInit {
//     constructor() {

//     }
//     ngOnInit() {

//   }
// }


import { Component, OnInit } from '@angular/core';
import { PostService } from '../postlist/postlist.service';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostListComponent implements OnInit {
  title = 'app';
  posts: any[] = [];
  private postItem;


  constructor(private postService: PostService) {

  }

  ngOnInit(): void {
      this.postService.getPosts()
      .then(posts => this.posts = posts.posts.reverse());
  }
}

