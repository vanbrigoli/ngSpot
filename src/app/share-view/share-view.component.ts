import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';

import { Payee, Payment } from '../models/payment.models';

@Component({
  selector: 'app-share-view',
  templateUrl: './share-view.component.html',
  styleUrls: ['./share-view.component.css']
})
export class ShareViewComponent implements OnInit {
  private paymentsCollection: AngularFirestoreCollection<Payment>;

  payees: Payee[] = [];
  monthOf;
  showSpinner = false;
  user;

  constructor(private route: ActivatedRoute,
              private afs: AngularFirestore,
              private afAuth: AngularFireAuth) {
    this.paymentsCollection = this.afs.collection<Payment>('payments');
  }

  ngOnInit() {
    this.showSpinner = true;

    this.afAuth.user.subscribe(user => {
      this.user = user;
    });

    this.route.queryParams.subscribe(params => {
      const payMonth = +params['paymentMonth'];
      const createdBy = params['createdBy'];
      this.paymentsCollection.ref
        .where('createdBy', '==', createdBy)
        .where('month.value', '==', payMonth)
        .get()
        .then(snapshots => {
          const data = snapshots.docs.map(doc => {
            return doc.data();
          });
          this.payees = data[0].payees;
          this.showSpinner = false;
        });
    });
  }
}
