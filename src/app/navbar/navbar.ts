import { Injectable } from '@angular/core';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../service/user.service';

import { User } from '../models/user';

@Injectable()

@Component({
  selector: 'navbar',
  templateUrl: './navbar.html'
})

export class NavBar implements OnInit {
  USER = JSON.parse(localStorage.getItem('currentUser'));
  user: any = {};
  currentUser: User;
  users: User[] = [];
  isLoggedIn$: Observable<boolean>;
  // private isLoggedIn;
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(private authService: AuthService, private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  reason = '';

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  onLogout(){
    this.authService.logout();                      // {3}
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.userService.getUser(this.USER.userName)
    .then( user => this.user = user);
  }
  
}


