import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import { MatSnackBar } from '@angular/material';

import { Month, Payment, MONTHS } from '../../../models/payment.models';


@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {
  @Input() payments: Payment[] = [];
  @Input() appUser;
  private paymentCollection: AngularFirestoreCollection<Payment>;
  private paymentListObs: Observable<Payment[]>;

  createForm;
  month: FormControl;
  total: FormControl;
  months: Month[] = MONTHS;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private afs: AngularFirestore,
              private snackBar: MatSnackBar) {
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
    if (this.payments.length === 0) {
      this.addPayment();
    } else {
      const paymentArr = this.payments.filter(payment => payment.month.value === this.month.value);
      if (paymentArr.length === 0) {
        this.addPayment();
      } else {
        this.snackBar.open('Payment already exists.', 'Close', { duration: 2000 });
      }
    }
  }

  private addPayment() {
    const newPayment = new Payment(
      new Month(this.month.value, MONTHS[this.month.value].viewValue),
      this.total.value,
      false,
      this.appUser.uid);
    this.paymentCollection.add(JSON.parse(JSON.stringify(newPayment)));
    this.createForm.reset();
  }
}
