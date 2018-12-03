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
    this.paymentListObs = this.paymentCollection.valueChanges();
  }

  ngOnInit() {
    this.afAuth.user.subscribe(user => {
      this.appUser = user;
    });

    this.memberListObs.subscribe((members: Member[]) => {
      this.members = members.filter(member => member.memberOf === this.appUser.uid);
    });

    this.paymentListObs.subscribe((payments: Payment[]) => {
      this.payments = payments.filter(payment => payment.createdBy === this.appUser.uid);
    });
  }

  handleReturnPayment(payment: Payment) {
    this.showPaymentView = true;
    this.payment = payment;
  }
}
