import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user;

  constructor(public afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  logoutGoogle() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }
}
