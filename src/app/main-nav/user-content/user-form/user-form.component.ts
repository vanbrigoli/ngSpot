import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';

import { Member } from '../../../models/user.models';

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

  constructor(private afs: AngularFirestore, private snackBar: MatSnackBar) {
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

  private addMember() {
    const newMember = new Member(this.capitalize(this.firstName.value),
      this.capitalize(this.lastName.value),
      this.dateJoined.value,
      this.appUser.uid);
    this.membersCollection.add(JSON.parse(JSON.stringify(newMember)));
    this.userForm.reset();
  }

  private capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
