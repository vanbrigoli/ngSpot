import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { User } from '../../../models/user.models';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  private usersCollection: AngularFirestoreCollection<User>;
  private userListObs: Observable<User[]>;

  users: User[] = [];
  userForm;
  firstName: FormControl;
  lastName: FormControl;
  dateJoined: FormControl;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection<User>('users');
    this.userListObs = this.usersCollection.valueChanges();
  }

  ngOnInit() {
    this.userListObs.subscribe((users: User[]) => {
      this.users = users;
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
    this.usersCollection.ref.where('firstName', '==', this.firstName.value)
      .where('lastName', '==', this.lastName.value).get()
      .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.exists) {
          console.log('User already exist.');
        } else {
          const newUser = new User(this.firstName.value, this.lastName.value, this.dateJoined.value);
          this.usersCollection.add(JSON.parse(JSON.stringify(newUser)));
        }
      });
    });
  }
}
