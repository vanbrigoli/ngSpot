import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { Member } from './members.service';
import { Payment } from '../models/payment.models';

@Injectable()
export class PaymentsService {
  onPaymentMemberAdd = new Subject<Member>();
  onAddPaymentMembers = new Subject<Member[]>();
  onCreatePayment = new Subject<void>();
  onUserExists = new Subject<void>();
  private paymentCollection: AngularFirestoreCollection<Payment>;

  constructor(private afs: AngularFirestore) {
    this.paymentCollection = this.afs.collection<Payment>('payments');
  }

  onEditPaid(payees, paymentId) {
    const editPayees = this.paymentCollection.doc<Payment>(paymentId);
    editPayees.update({ payees: JSON.parse(JSON.stringify(payees)) });
  }
}
