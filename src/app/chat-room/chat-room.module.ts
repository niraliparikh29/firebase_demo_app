import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoomComponent } from './chat-room.component';
import { UserListComponent } from './user-list/user-list.component';
import { FeedComponent } from './feed/feed.component';
import { MessagesComponent } from './messages/messages.component';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserItemComponent } from './user-item/user-item.component';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupItemComponent } from './group-item/group-item.component'
import { ChatRoomRoutingModule } from './chat-room-routing.module';

@NgModule({
  declarations: [ChatRoomComponent, UserListComponent, FeedComponent, MessagesComponent, ChatFormComponent, UserItemComponent, UploadFormComponent, GroupListComponent, GroupItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChatRoomRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ChatRoomModule { }
