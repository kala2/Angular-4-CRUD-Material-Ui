import { Injectable } from '@angular/core';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './service/auth.service';
import { Observable } from 'rxjs/Observable';

import { User } from './models/user';

@Injectable()

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  isLoggedIn$: Observable<boolean>;
  // private isLoggedIn;
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(private authService: AuthService) {
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
  }
  
}


