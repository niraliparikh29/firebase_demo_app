import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Upload } from '../model/upload.model';

import * as firebase from 'firebase/app';
import 'firebase/storage';
import { ChatService } from './chat.service';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private db: AngularFireDatabase, private chatService: ChatService) { }

  private basePath: string = '/uploads';
  uploads: AngularFireList<Upload[]>;

  pushUpload(upload: Upload, groupName: string) {
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log('Error', error)
      },
      async () => {
        upload.name = upload.file.name;
        await storageRef.child(`${this.basePath}/${upload.file.name}`).getDownloadURL().then((data) => {
          upload.url = data;
        })
        if (upload.progress === 100) {
          this.saveFileData(upload, groupName)
        }
      }
    );
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: Upload, groupName: string) {
    const path = `/${groupName}/messages/`;

    this.db.list(path).push({
      email: firebase.auth().currentUser.email,
      userName: this.chatService.userName,
      message: '',
      fileName: upload.name,
      type: upload.file.type,
      url: upload.url,
      timeSent: this.getTimeStamp(),
    });
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getFullYear() + '/' + (now.getUTCMonth() + 1) + '/' + now.getUTCDate();
    const time = now.getUTCHours() + ':' + now.getUTCMinutes() + ':' + now.getUTCSeconds();

    return (date + ' ' + time);
  }

  public getuploadType(path: string) {
    return path;
  }
}
