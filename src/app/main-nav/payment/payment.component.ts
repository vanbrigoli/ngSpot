import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Member } from '../../models/user.models';
import { Payment } from '../../models/payment.models';

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
              private afs: AngularFirestore) {
    this.membersCollection = this.afs.collection<Member>('members');
    this.memberListObs = this.membersCollection.valueChanges();
    this.paymentCollection = this.afs.collection<Payment>('payments');
    this.paymentListObs = this.paymentCollection.valueChanges();
  }

  ngOnInit() {
    this.appUser = JSON.parse(localStorage.getItem('appUser'));
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
