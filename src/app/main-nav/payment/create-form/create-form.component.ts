import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Month, Payment } from '../../../models/payment.models';

const MONTHS: Month[] = [
  { value: 0, viewValue: 'January' },
  { value: 1, viewValue: 'February' },
  { value: 2, viewValue: 'March' },
  { value: 3, viewValue: 'April' },
  { value: 4, viewValue: 'May' },
  { value: 5, viewValue: 'June' },
  { value: 6, viewValue: 'July' },
  { value: 7, viewValue: 'August' },
  { value: 8, viewValue: 'September' },
  { value: 9, viewValue: 'October' },
  { value: 10, viewValue: 'November' },
  { value: 11, viewValue: 'December' }
];


@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {
  private paymentCollection: AngularFirestoreCollection<Payment>;
  private paymentListObs: Observable<Payment[]>;

  payments: Payment[] = [];
  createForm;
  month: FormControl;
  total: FormControl;
  months: Month[] = MONTHS;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private afs: AngularFirestore) {
    this.paymentCollection = this.afs.collection<Payment>('payments');
    this.paymentListObs = this.paymentCollection.valueChanges();
  }

  ngOnInit() {
    this.createForm = new FormGroup({
      'month': new FormControl('', [Validators.required]),
      'total': new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')])
    });
    this.month = this.createForm.get('month');
    this.total = this.createForm.get('total');
  }

  onCreateForm() {
    const paymentQuery = this.paymentCollection.ref.where('month.value', '==', this.month.value);
    paymentQuery.get().then((querySnaphot) => {
      querySnaphot.forEach((doc) => {
        if (doc) {
          console.log('Document already exist!');
        } else {
          const newPayment = new Payment(
            new Month(this.month.value, MONTHS[this.month.value].viewValue), this.total.value, false);
          this.paymentCollection.add(JSON.parse(JSON.stringify(newPayment)));
          this.createForm.reset();
        }
      });
    });
  }
}
