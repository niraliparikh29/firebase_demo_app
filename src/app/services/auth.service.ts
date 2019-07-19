import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: Observable<firebase.User>;
  public authState: any;

  constructor(private router: Router, private afAuth: AngularFireAuth, private db: AngularFireDatabase, private afStore: AngularFirestore) {
    this.user = afAuth.authState;
    this.authState = firebase.auth().currentUser;
  }

  authuser() {
    return this.user;
  }

  isAuthenticated() {
    var user = firebase.auth().currentUser;
    if (user) {
      return true;
    }
    else {
      return false;
    }
  }

  get currentUserId(): string {
    return this.authState ? this.authState.user.uid : '';
  }

  signup(email: string, password: string, displayName: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        const status = "offline";
        let currentUser = firebase.auth().currentUser;
        currentUser.updateProfile({
          displayName: displayName
        }).then(() => {
          this.afStore.collection('users').doc(this.authState.user.uid).set({
            displayName: displayName,
            email: email,
            status: status,
          });
        }).catch((error) => console.log(error))
      }).catch((error) => console.log(error))
  }

  setUserStatus(status: string): void {
    const data = {
      status: status
    };
    this.afStore.collection('users').doc(firebase.auth().currentUser.uid).update(data).then((value) => { })
      .catch((error) => {
        console.log(error)
      })
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.setUserStatus('online');
        this.router.navigateByUrl('chatroom');
      })
  }

  logout() {
    this.setUserStatus('offline');
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('login');
  }
}
