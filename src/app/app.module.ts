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
import { MemberContentComponent } from './main-nav/member/member-content.component';
import { HeaderComponent } from './main-nav/header/header.component';
import { MemberFormComponent } from './main-nav/member/member-form/member-form.component';
import { MemberListComponent } from './main-nav/member/member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './home/footer/footer.component';
import { PaymentComponent } from './main-nav/payment/payment.component';
import { CreateFormComponent } from './main-nav/payment/create-form/create-form.component';
import { PaymentListComponent } from './main-nav/payment/payment-list/payment-list.component';
import { PaymentViewComponent } from './main-nav/payment/payment-view/payment-view.component';
import { LoginComponent } from './login/login.component';
import { ShareViewComponent } from './share-view/share-view.component';
import { PaymentMembersComponent } from './main-nav/payment/payment-members/payment-members.component';

import { SpinnerComponent } from './shared/spinner/spinner.component';
import { DialogComponent } from './shared/dialog/dialog.component';

import { environment as env } from '../environments/environment';

import { AuthGuard } from './services/auth.guard';
import { MembersService } from './services/members.service';
import { PaymentsService } from './services/payments.service';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    NavbarComponent,
    SideNavComponent,
    MemberContentComponent,
    HeaderComponent,
    MemberFormComponent,
    MemberListComponent,
    HomeComponent,
    FooterComponent,
    PaymentComponent,
    CreateFormComponent,
    PaymentListComponent,
    PaymentViewComponent,
    LoginComponent,
    ShareViewComponent,
    SpinnerComponent,
    PaymentMembersComponent,
    DialogComponent
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
  entryComponents: [
    DialogComponent
  ],
  providers: [AuthGuard, MembersService, PaymentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
