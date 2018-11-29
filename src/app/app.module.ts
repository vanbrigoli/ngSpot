import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { UserContentComponent } from './main-nav/user-content/user-content.component';
import { HeaderComponent } from './main-nav/header/header.component';
import { UserFormComponent } from './main-nav/user-content/user-form/user-form.component';
import { UserListComponent } from './main-nav/user-content/user-list/user-list.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './home/footer/footer.component';
import { PaymentComponent } from './main-nav/payment/payment.component';
import { CreateFormComponent } from './main-nav/payment/create-form/create-form.component';
import { PaymentListComponent } from './main-nav/payment/payment-list/payment-list.component';
import { PaymentViewComponent } from './main-nav/payment/payment-view/payment-view.component';
import { LoginComponent } from './login/login.component';
import { ShareViewComponent } from './share-view/share-view.component';

import { environment as env } from '../environments/environment';

import { AuthGuard } from './services/auth.guard';
import { ShareViewService } from './services/share-view.service';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    NavbarComponent,
    SideNavComponent,
    UserContentComponent,
    HeaderComponent,
    UserFormComponent,
    UserListComponent,
    HomeComponent,
    FooterComponent,
    PaymentComponent,
    CreateFormComponent,
    PaymentListComponent,
    PaymentViewComponent,
    LoginComponent,
    ShareViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(env.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AppRoutingModule
  ],
  providers: [AuthGuard, ShareViewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
