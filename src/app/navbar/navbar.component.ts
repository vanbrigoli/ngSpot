import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() user;

  constructor(public afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  logoutGoogle() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/home']);
  }
}
