import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';

import { MembersService, Member } from '../../../services/members.service';
import { DialogComponent } from '../../../shared/dialog/dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  @Input() members: Member[] = [];
  @Output() handlDeleteMember = new EventEmitter<string>();

  constructor(private membersService: MembersService, public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  deleteMember(member) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: member
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.handlDeleteMember.emit(member.id);
      }
    });
  }

  editMember(member: Member) {
    this.membersService.editMemberEvent.next(member);
  }
}
