import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user;

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  logoutGoogle() {
    this.afAuth.auth.signOut();
  }
}
