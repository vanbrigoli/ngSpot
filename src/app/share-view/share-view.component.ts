import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { SharePayment } from '../models/share-view.models';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { MONTHS, Payee } from '../models/payment.models';

@Component({
  selector: 'app-share-view',
  templateUrl: './share-view.component.html',
  styleUrls: ['./share-view.component.css']
})
export class ShareViewComponent implements OnInit {
  private payeesCollection: AngularFirestoreCollection<SharePayment>;
  private payeesListObs: Observable<SharePayment[]>;

  sharePayment: SharePayment[] = [];
  payees: Payee[] = [];
  monthOf;
  showSpinner = false;

  constructor(private route: ActivatedRoute, private afs: AngularFirestore) {
    this.payeesCollection = this.afs.collection<SharePayment>('payees');
    this.payeesListObs = this.payeesCollection.valueChanges();
  }

  ngOnInit() {
    this.showSpinner = true;
    this.route.queryParams.subscribe(params => {
      const payMonth = +params['paymentMonth'];
      const createdBy = params['createdBy'];
      this.payeesListObs.subscribe(payees => {
        this.sharePayment = payees.filter(payee => payee.month.value === payMonth
          && payee.userUuid === createdBy);
        if (typeof payMonth === 'number' && typeof createdBy === 'string') {
          this.monthOf = MONTHS[payMonth].viewValue;
          if (this.sharePayment.length > 0) {
            this.payees = this.sharePayment[0].payees;
          }
        }
        this.showSpinner = false;
      });
    });
  }
}
