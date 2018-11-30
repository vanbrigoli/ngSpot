import {Component, ElementRef, OnInit} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loggingIn = false;
  hovered = false;

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.afAuth.user.subscribe(user => {
      if (user) {
        const returnUrl = localStorage.getItem('returnUrl') || '/home';
        this.router.navigateByUrl(returnUrl);
      }
    });
  }

  loginGoogle() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/home';
    localStorage.setItem('returnUrl', returnUrl);
    this.loggingIn = true;

    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(() => {
      this.loggingIn = false;
    });
  }
}
