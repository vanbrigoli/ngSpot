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
    this.user = JSON.parse(localStorage.getItem('appUser'));
  }

  logoutGoogle() {
    this.afAuth.auth.signOut();
    localStorage.removeItem('appUser');
    this.router.navigate(['/home']);
  }
}
