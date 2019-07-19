import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  email: string;
  password: string;
  displayName: string;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router, private title: Title) { 
    this.title.setTitle("Signup");
  }

  ngOnInit() {
  }

  signUp(){
    const email = this.email;
    const password = this.password;
    const displayName = this.displayName;

    this.authService.signup(email, password, displayName)
      .then(response => {
        this.authService.logout();
      })
      .catch(error => this.errorMessage = error.message);
  }

}
