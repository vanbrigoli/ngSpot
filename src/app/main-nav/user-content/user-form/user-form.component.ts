import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Member } from '../../../models/user.models';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  private membersCollection: AngularFirestoreCollection<Member>;
  private memberListObs: Observable<Member[]>;

  members: Member[] = [];
  userForm;
  firstName: FormControl;
  lastName: FormControl;
  dateJoined: FormControl;
  appUser;

  constructor(private afs: AngularFirestore) {
    this.membersCollection = this.afs.collection<Member>('members');
    this.memberListObs = this.membersCollection.valueChanges();
  }

  ngOnInit() {
    this.appUser = JSON.parse(localStorage.getItem('appUser'));

    this.memberListObs.subscribe((members: Member[]) => {
      this.members = members.filter(member => {
        return member.memberOf === this.appUser.uid;
      });
    });
    this.userForm = new FormGroup({
      'firstName': new FormControl('', [Validators.required]),
      'lastName': new FormControl('', [Validators.required]),
      'dateJoined': new FormControl({value: ''}, [Validators.required])
    });
    this.firstName = this.userForm.get('firstName');
    this.lastName = this.userForm.get('lastName');
    this.dateJoined = this.userForm.get('dateJoined');
  }

  onAddUser() {
    if (this.members.length === 0) {
      const newMember = new Member(this.firstName.value,
        this.lastName.value,
        this.dateJoined.value,
        this.appUser.uid);
      this.membersCollection.add(JSON.parse(JSON.stringify(newMember)));
    } else {
      const memberArr = this.members.filter(member => {
        return member.firstName === this.firstName.value && member.lastName === this.lastName.value;
      });
      if (!memberArr) {
        const newMember = new Member(this.firstName.value,
          this.lastName.value,
          this.dateJoined.value,
          this.appUser.uid);
        this.membersCollection.add(JSON.parse(JSON.stringify(newMember)));
      } else {
        console.log('Snackbar here');
      }
    }
  }
}
