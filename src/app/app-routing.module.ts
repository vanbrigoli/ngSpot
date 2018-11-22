import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainNavComponent } from './main-nav/main-nav.component';
import { HomeComponent } from './home/home.component';
import { ContentComponent } from './content/content.component';
import { PaymentComponent } from './payment/payment.component';

const appRoutes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'users', component: MainNavComponent, data: {header: 'Users'}, children: [
      {
        path: '', component: ContentComponent
      }
    ]
  },
  {
    path: 'pay', component: MainNavComponent, data: {header: 'Pay'}, children: [
      {
        path: '', component: PaymentComponent
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
