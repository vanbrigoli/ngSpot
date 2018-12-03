import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';

import { Member } from '../../../models/user.models';
import { MembersService } from '../../../services/members.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Input() members: Member[] = [];
  @Input() appUser;
  private membersCollection: AngularFirestoreCollection<Member>;
  private memberListObs: Observable<Member[]>;

  userForm;
  firstName: FormControl;
  lastName: FormControl;
  dateJoined: FormControl;
  editMember = false;
  memberUuid: string;

  constructor(private afs: AngularFirestore,
              private snackBar: MatSnackBar,
              private membersService: MembersService) {
    this.membersCollection = this.afs.collection<Member>('members');
    this.memberListObs = this.membersCollection.valueChanges();
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      'firstName': new FormControl('', [Validators.required]),
      'lastName': new FormControl('', [Validators.required]),
      'dateJoined': new FormControl({value: ''}, [Validators.required])
    });
    this.firstName = this.userForm.get('firstName');
    this.lastName = this.userForm.get('lastName');
    this.dateJoined = this.userForm.get('dateJoined');

    this.membersService.editMemberEvent.subscribe(member => {
      this.editMember = true;
      this.firstName.setValue(member.firstName);
      this.lastName.setValue(member.lastName);
      this.dateJoined.setValue(member.dateJoined.toDate());
      this.memberUuid = member.id;
    });
  }

  onAddUser() {
    if (this.members.length === 0) {
      this.addMember();
    } else {
      const memberArr = this.members.filter(member => {
        return member.firstName.toLowerCase() === this.firstName.value.toLowerCase()
          && member.lastName.toLowerCase() === this.lastName.value.toLowerCase();
      });
      if (memberArr.length === 0) {
        this.addMember();
      } else {
        this.snackBar.open('Member already exists.', 'Close', { duration: 2000 });
      }
    }
  }

  onSaveMember() {
    this.firstName = this.userForm.get('firstName');
    this.lastName = this.userForm.get('lastName');
    this.dateJoined = this.userForm.get('dateJoined');

    const mem = this.membersCollection.doc<Member>(this.memberUuid);
    mem.update({firstName: this.firstName.value,
      lastName: this.lastName.value,
      dateJoined: this.dateJoined.value})
      .then(success => {
        this.snackBar.open('Member data updated.', 'Close', { duration: 2000 });
        this.editMember = false;
        this.userForm.reset();
    });
  }

  private addMember() {
    this.membersCollection.add({
      firstName: MembersService.capitalize(this.firstName.value),
      lastName: MembersService.capitalize(this.lastName.value),
      dateJoined: this.dateJoined.value,
      memberOf: this.appUser.uid
    });
    this.userForm.reset();
  }
}
