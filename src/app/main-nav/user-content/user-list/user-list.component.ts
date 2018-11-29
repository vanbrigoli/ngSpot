import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Member } from '../../../models/user.models';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  private membersCollection: AngularFirestoreCollection<Member>;
  private memberListObs: Observable<Member[]>;

  members: Member[] = [];

  constructor(private afs: AngularFirestore) {
    this.membersCollection = this.afs.collection<Member>('members');
    this.memberListObs = this.membersCollection.valueChanges();
  }

  ngOnInit() {
    this.memberListObs.subscribe((members: Member[]) => {
      this.members = members;
    });
  }
}
