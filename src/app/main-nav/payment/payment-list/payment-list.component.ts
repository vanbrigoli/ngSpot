import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Payment } from '../../../models/payment.models';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  private paymentCollection: AngularFirestoreCollection<Payment>;
  private paymentListObs: Observable<Payment[]>;

  payments: Payment[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private afs: AngularFirestore) {
    this.paymentCollection = this.afs.collection<Payment>('payments');
    this.paymentListObs = this.paymentCollection.valueChanges();
  }

  ngOnInit() {
    this.paymentListObs.subscribe((payments: Payment[]) => {
      this.payments = payments;
    });
  }

  toPaymentView(monthId: number) {
    this.router.navigate([monthId], { relativeTo: this.route });
  }
}
