import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})
export class GroupItemComponent implements OnInit {

  @Input() groupDetail: any;
  groupData: any;

  constructor(private router: Router) { }

  ngOnInit() { }

  onGroupNameClick(data) {
    this.groupData = data;
    this.router.navigate(['chatroom' + '/' + 'groups' + '/' + data.groupName + '/' + 'messages'])
  }

}
