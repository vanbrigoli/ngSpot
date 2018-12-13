import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { Member } from '../../services/members.service';

@Component({
  selector: 'app-content',
  templateUrl: './member-content.component.html',
  styleUrls: ['./member-content.component.css']
})
export class MemberContentComponent implements OnInit {
  private membersCollection: AngularFirestoreCollection<Member>;
  private memberListObs: Observable<Member[]>;

  members: Member[] = [];
  appUser;

  constructor(private afs: AngularFirestore,
              private afAuth: AngularFireAuth,
              private snackBar: MatSnackBar,) {
    this.membersCollection = this.afs.collection<Member>('members');
    this.memberListObs = this.membersCollection.snapshotChanges()
      .pipe(map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data();
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      }));
  }

  ngOnInit() {
    this.afAuth.user.subscribe(user => {
      this.appUser = user;
    });

    this.memberListObs.subscribe((members: Member[]) => {
      this.members = members.filter(member => member.memberOf === this.appUser.uid);
    });
  }

  onDeleteMember(ev) {
    const mem = this.membersCollection.doc<Member>(ev);
    mem.delete().then(() => {
      this.snackBar.open('Member deleted.', 'Close', { duration: 2000 });
    });
  }
}
