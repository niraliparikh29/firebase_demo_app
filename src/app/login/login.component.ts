import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  errorMsg: string;

  constructor(private authService: AuthService, private router: Router, private title: Title) {
    this.title.setTitle("Login");
    this.authService.authuser().subscribe((user) => {
      if (user) {
        this.router.navigateByUrl('chatroom');
      }
    });

  }

  ngOnInit() {
  }

  login() {
    const email = this.email;
    const password = this.password;

    this.authService.login(email, password)
      .catch((error) => this.errorMsg = error);
  }
}
