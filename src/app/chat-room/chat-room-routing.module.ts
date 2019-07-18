import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoomComponent } from './chat-room.component';
import { Routes, RouterModule } from '@angular/router';
import { GroupListComponent } from './group-list/group-list.component';
import { FeedComponent } from './feed/feed.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'groups',
    pathMatch: 'full',
  },
  {
    path: 'groups',
    component: ChatRoomComponent,
    children: [
      {
        path: '',
        redirectTo: 'groups',
        pathMatch: 'full',
      },
    ]
  },
  {
    path: 'chatroom/groups/:groupName/messages',
    component: FeedComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoomRoutingModule { }
