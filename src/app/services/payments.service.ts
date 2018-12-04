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
  private membersCollection: AngularFirestoreCollection<Member>;
  private paymentCollection: AngularFirestoreCollection<Payment>;

  constructor(private afs: AngularFirestore) {
    this.membersCollection = this.afs.collection<Member>('members');
    this.paymentCollection = this.afs.collection<Payment>('payments');
  }
}
