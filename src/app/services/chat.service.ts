import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase/app'
import { ChatMessage } from '../model/chat-message.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  user: firebase.User;
  chatMessages: AngularFireList<any>;
  chatMessage: ChatMessage;
  public userName: Observable<string>;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private afStore: AngularFirestore) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
      this.getUserDetails().valueChanges().subscribe((response) => {
        let userDetails: any = response;
        this.userName = userDetails.displayName;
      })
    });
  }

  getUsers() {
    const path = '/users';
    return this.db.database.ref(path);
  }

  sendMessages(msg: string, groupName: string) {
    const timeStamp = this.getTimeStamp();
    const email = this.user.email;

    this.db.list(`${groupName}/messages`).push({
      email: email,
      userName: this.userName,
      message: msg,
      timeSent: timeStamp,
    })
  }

  getData(path: any): AngularFireList<any> {
    return this.db.list(path);
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getFullYear() + '/' + (now.getUTCMonth() + 1) + '/' + now.getUTCDate();
    const time = now.getUTCHours() + ':' + now.getUTCMinutes() + ':' + now.getUTCSeconds();

    return (date + ' ' + time)
  }

  getUserDetails() {
    return this.afStore.collection('users').doc(firebase.auth().currentUser.uid);
  }

} 