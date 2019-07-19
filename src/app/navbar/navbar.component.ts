import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';

import { Observable, Subscriber, Subscription } from 'rxjs';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  user: Observable<firebase.User>;
  userEmail: string;
  userSubs: Subscription;
  showUser: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.authuser();
    this.userSubs = this.user.subscribe((response) => {
      if (response !== null) {
        this.showUser = true;
        this.userEmail = response.email;
      }
    });
  }

  logout() {
    this.showUser = false;
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }

}
