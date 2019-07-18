import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  groupDetails: any = [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getUserDetails().valueChanges().subscribe((response) => {
      this.groupDetails = []
      let userDetails: any = response;
      if (userDetails.groups) {
        userDetails.groups.forEach((data) => {
          this.groupDetails.push(data);
        })
      }
    });
  }

}
