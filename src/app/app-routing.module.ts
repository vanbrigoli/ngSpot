import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainNavComponent } from './main-nav/main-nav.component';
import { HomeComponent } from './home/home.component';
import { UserContentComponent } from './main-nav/user-content/user-content.component';
import { PaymentComponent } from './main-nav/payment/payment.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './services/auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'members', component: MainNavComponent, data: {header: 'Members'}, children: [
      { path: '', component: UserContentComponent }
    ], canActivate: [AuthGuard] },
  { path: 'pay', component: MainNavComponent, data: {header: 'Pay'}, children: [
      { path: '', component: PaymentComponent }
    ], canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
