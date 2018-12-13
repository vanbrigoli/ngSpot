import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { OnInit } from '@angular/core';

import { AppUser } from '../models/user.models';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent implements OnInit {
  private appUsersCollection: AngularFirestoreCollection<AppUser>;
  private appUsersLists: Observable<AppUser[]>;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  user;

  constructor(private breakpointObserver: BreakpointObserver,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore) {
    this.appUsersCollection = this.afs.collection<AppUser>('app_users');
    this.appUsersLists = this.appUsersCollection.valueChanges();
  }

  ngOnInit() {
    this.afAuth.user.subscribe(user => {
      this.user = this.checkIfUserExistsInDb(user);
    });
  }

  checkIfUserExistsInDb(user: AppUser) {
    if (user) {
      this.appUsersLists.subscribe(appUsers => {
        const usr = appUsers.filter((appUser: AppUser) => {
          return appUser.uid === user.uid;
        });
        if (usr === undefined || usr.length === 0) {
          this.appUsersCollection.add(JSON.parse(JSON.stringify(
            new AppUser(user.displayName, user.uid, user.email))
          ));
        }
      });
    }
    return user;
  }
}
