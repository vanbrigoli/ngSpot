import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { User } from '../../../models/user.models';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  private usersCollection: AngularFirestoreCollection<User>;
  private userListObs: Observable<User[]>;

  users: User[] = [];

  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection<User>('users');
    this.userListObs = this.usersCollection.valueChanges();
  }

  ngOnInit() {
    this.userListObs.subscribe((users: User[]) => {
      this.users = users;
    });
  }
}
