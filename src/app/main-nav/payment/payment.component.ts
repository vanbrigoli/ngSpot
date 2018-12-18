import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { Member } from '../../services/members.service';
import { Month, MONTHS, Payee, Payment } from '../../models/payment.models';
import { PaymentsService } from '../../services/payments.service';
import { PaymentMembersComponent } from './payment-members/payment-members.component';

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

  @ViewChild(PaymentMembersComponent)
  paymentMembersComponent: PaymentMembersComponent;

  showPaymentView = false;
  payment: Payment;
  appUser;
  members: Member[] = [];
  payments: Payment[] = [];
  hasPaymentMembers = false;
  showSpinner = false;

  constructor(private route: ActivatedRoute,
              private afs: AngularFirestore,
              private afAuth: AngularFireAuth,
              private paymentsService: PaymentsService,
              private snackBar: MatSnackBar) {
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

    this.paymentsService.onCreatePayment.subscribe(({month, total}) => {
      this.hasPaymentMembers = false;
      const paymentMembers = this.paymentMembersComponent.paymentMembers;
      const newPayees = paymentMembers.map(pMembers => {
        const fullName = `${pMembers.firstName} ${pMembers.lastName}`;
        return new Payee(fullName,
          total / paymentMembers.length,
          false,
          pMembers['id']);
      });
      const newPayment = new Payment(
        new Month(month.value, MONTHS[month.value].viewValue),
        total,
        false,
        this.appUser.uid,
        newPayees);
      this.showSpinner = true;
      this.paymentsService.onAddPayment(newPayment).then(data => {
        this.snackBar.open('Payment added.', 'Close', { duration: 2000 });
        data.get().then((s: any) => {
          this.payment = s.data();
          this.payment['id'] = s.id;
          this.showSpinner = false;
          this.showPaymentView = true;
        });
      });
    });

    this.paymentsService.onAddMember.subscribe(_ => {
      this.hasPaymentMembers = true;
    });

    this.paymentsService.onAddPaymentMembers.subscribe(members => {
      this.hasPaymentMembers = members.length > 0;
    });
  }

  handleReturnPayment(payment: Payment) {
    this.showPaymentView = true;
    this.payment = payment;
  }
}
