import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Member } from '../../models/user.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.css']
})
export class UserContentComponent implements OnInit {
  private membersCollection: AngularFirestoreCollection<Member>;
  private memberListObs: Observable<Member[]>;

  members: Member[] = [];
  appUser;

  constructor(private afs: AngularFirestore) {
    this.membersCollection = this.afs.collection<Member>('members');
    this.memberListObs = this.membersCollection.valueChanges();
  }

  ngOnInit() {
    this.appUser = JSON.parse(localStorage.getItem('appUser'));
    this.memberListObs.subscribe((members: Member[]) => {
      this.members = members.filter(member => member.memberOf === this.appUser.uid);
    });
  }

}
