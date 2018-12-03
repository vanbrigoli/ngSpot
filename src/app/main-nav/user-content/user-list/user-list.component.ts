import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Member } from '../../../models/user.models';
import { MembersService } from '../../../services/members.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() members: Member[] = [];
  @Output() handlDeleteMember = new EventEmitter<string>();

  constructor(private membersService: MembersService) {
  }

  ngOnInit() {
  }

  deleteMember(memberUuid) {
    this.handlDeleteMember.emit(memberUuid);
  }

  editMember(member: Member) {
    this.membersService.editMemberEvent.next(member);
  }
}
