import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

import { Member } from '../../services/members.service';
import { Payment } from '../../models/payment.models';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  private membersCollection: AngularFirestoreCollection<Member>;
  private memberListObs: Observable<Member[]>;
  private paymentCollection: AngularFirestoreCollection<Payment>;
  private paymentListObs: Observable<Payment[]>;

  showPaymentView = false;
  payment: Payment;
  appUser;
  members: Member[] = [];
  payments: Payment[] = [];

  constructor(private route: ActivatedRoute,
              private afs: AngularFirestore,
              private afAuth: AngularFireAuth) {
    this.membersCollection = this.afs.collection<Member>('members');
    this.memberListObs = this.membersCollection.snapshotChanges()
      .pipe(map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data();
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      }));
    this.paymentCollection = this.afs.collection<Payment>('payments');
    this.paymentListObs = this.paymentCollection.snapshotChanges()
      .pipe(map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data();
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      }));
  }

  ngOnInit() {
    this.afAuth.user.subscribe(user => {
      this.appUser = user;
    });

    this.memberListObs
      .pipe(
        map(members => members.filter(member => member.memberOf === this.appUser.uid)))
      .subscribe((members: Member[]) => {
        this.members = members;
      });

    this.paymentListObs
      .pipe(
        map(payments =>
          payments.filter(member => member.createdBy === this.appUser.uid)
            .sort((pay1, pay2) => pay1.month.value > pay2.month.value ? 1 : -1)))
      .subscribe((payments: Payment[]) => {
        this.payments = payments;
      });
  }

  handleReturnPayment(payment: Payment) {
    this.showPaymentView = true;
    this.payment = payment;
  }
}
