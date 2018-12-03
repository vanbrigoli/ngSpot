import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Member } from '../../../models/user.models';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() members: Member[] = [];
  @Output() handlDeleteMember = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  deleteMember(memberUuid) {
    this.handlDeleteMember.emit(memberUuid);
  }
}
