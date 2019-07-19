import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ChatMessage } from '../../model/chat-message.model';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  @Input() chatMessage: ChatMessage;
  userEmail: string;
  userName: string;
  messageContent: string;
  timeStamp: Date = new Date();
  isOwnMessage: boolean;
  ownEmail: string;

  fileName: string;
  fileType: string;
  uploadedUrl: string;

  constructor(private authService: AuthService, private sanitizer: DomSanitizer, private uploadService: UploadService) {
    this.authService.authuser().subscribe((user) => {
      if (user !== null) {
        this.ownEmail = user.email;
      }
      this.isOwnMessage = this.ownEmail === this.userEmail;
    })
  }

  ngOnInit(chatMessage = this.chatMessage) {
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeSent;
    this.userEmail = chatMessage.email;
    this.userName = chatMessage.userName;
    this.fileName = chatMessage.fileName;
    this.fileType = chatMessage.type;
    this.uploadedUrl = chatMessage.url;
  }

  async downloadImage(downloadUrl): Promise<void> {
    // console.log(downloadUrl);

    // const extension: string = '.png';
    let a: HTMLElement = await document.createElement('a');
    // console.log("A:::::", a);
    await document.body.appendChild(a);
    // //a.href = downloadUrl;
    await a.setAttribute('href', downloadUrl);

    // await a.setAttribute('href', 'data:'+ this.fileType + ';charset=utf-8,' + encodeURIComponent(text));

    await a.setAttribute('target', '_blank');
    // console.log("A:::::", a);
    await a.setAttribute('download', this.fileName);
    // console.log("A:::::", a);
    a.click();
    // await window.URL.revokeObjectURL(downloadUrl);
    a.remove();

    // let data = new Blob([downloadUrl], { type: this.fileType });
    // element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));

    // let a: HTMLElement = await document.createElement('a');
    // await document.body.appendChild(a);
    // await a.setAttribute('href', downloadUrl);

    // console.log("A:::::", a);
    // await a.setAttribute('download', this.fileName);

    // await a.setAttribute('type', this.fileType + ';octet-stream');
    // // await a.setAttribute('target', '_blank');

    // console.log("A:::::", a);
    // a.click();
    // a.remove();
  }

  downlodFiles(downloadUrl) {
    this.toDataURL(downloadUrl, (dataUrl) => {
      this.downloadImage(dataUrl)
    })
  }

  toDataURL(url, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onload = function () {
      var fileReader = new FileReader();
      fileReader.onloadend = function () {
        callback(fileReader.result);
      }
      fileReader.readAsDataURL(httpRequest.response);
    };
    httpRequest.open('GET', url);
    httpRequest.responseType = 'blob';
    httpRequest.withCredentials = true;
    httpRequest.send();
  }

}