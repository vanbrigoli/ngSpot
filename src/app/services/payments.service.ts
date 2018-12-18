import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { Member } from './members.service';
import {Month, MONTHS, Payee, Payment} from '../models/payment.models';

@Injectable()
export class PaymentsService {
  onAddMember = new Subject<Member>();
  onAddPaymentMembers = new Subject<Member[]>();
  onCreatePayment = new Subject<{month, total}>();
  onUserExists = new Subject<void>();
  private paymentCollection: AngularFirestoreCollection<Payment>;

  constructor(private afs: AngularFirestore) {
    this.paymentCollection = this.afs.collection<Payment>('payments');
  }

  onEditPaid(payees, paymentId) {
    const editPayees = this.paymentCollection.doc<Payment>(paymentId);
    let fullPaid = true;
    for (const payee of payees) {
      if (payee.paid !== true) {
        fullPaid = false;
        break;
      }
    }
    editPayees.update({ payees: JSON.parse(JSON.stringify(payees)), resolve: fullPaid });
  }

  onAddPayment(payment) {
    return this.paymentCollection.add(JSON.parse(JSON.stringify(payment)));
  }

  onDeletePayment(paymentId) {
    const deletePayment = this.paymentCollection.doc<Payment>(paymentId);
    return deletePayment.delete();
  }
}
