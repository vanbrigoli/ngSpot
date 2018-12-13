import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { MembersService, Member } from '../../../services/members.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
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
