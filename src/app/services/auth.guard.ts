import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.afAuth.authState.pipe(
      take(1),
      map(user => {
        return !!user;
      }),
      tap( loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        }
      })
    );
  }
}
