import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  message: string = ''

  constructor(private chatService: ChatService, private route: ActivatedRoute) { }

  ngOnInit() {

  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.sendMessage();
    }
  }

  sendMessage() {
    this.route.params.subscribe((params) => {
      this.chatService.sendMessages(this.message, params.groupName);
      this.message = '';
    });
  }

}
