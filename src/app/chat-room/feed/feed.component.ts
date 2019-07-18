import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { UploadService } from 'src/app/services/upload.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  feed: any = [];
  uploadData: any = [];

  constructor(private chatService: ChatService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.chatService.getData(`${params.groupName}/messages`).snapshotChanges().subscribe((values) => {
        this.feed = []
        values.forEach((value) => {
          this.feed.push(value.payload.val());
        })
      });
    })
  }

  goBack(){
    this.router.navigateByUrl('chatroom/groups')
  }
}
