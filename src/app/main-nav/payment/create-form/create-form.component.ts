import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import { MatSnackBar } from '@angular/material';

import { Month, Payment, MONTHS } from '../../../models/payment.models';
import { Member } from '../../../services/members.service';
import { PaymentsService } from '../../../services/payments.service';


@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {
  @Input() payments: Payment[] = [];
  @Input() members: Member[] = [];
  @Input() appUser;
  private paymentCollection: AngularFirestoreCollection<Payment>;
  private paymentListObs: Observable<Payment[]>;

  createForm;
  month: FormControl;
  total: FormControl;
  months: Month[] = MONTHS;
  memberOpt: FormControl;
  paymentMembers = [];
  buttonDisabled = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private afs: AngularFirestore,
              private snackBar: MatSnackBar,
              private paymentService: PaymentsService) {
    this.paymentCollection = this.afs.collection<Payment>('payments');
    this.paymentListObs = this.paymentCollection.valueChanges();
  }

  ngOnInit() {
    this.createForm = new FormGroup({
      'month': new FormControl('', [Validators.required]),
      'memberOpt': new FormControl('', [Validators.required]),
      'total': new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')])
    });
    this.month = this.createForm.get('month');
    this.total = this.createForm.get('total');
    this.memberOpt = this.createForm.get('memberOpt');

    this.paymentService.onAddPaymentMembers.subscribe(members => {
      this.paymentMembers = members;
      this.buttonDisabled = this.paymentMembers.length === 0;
    });

    this.paymentService.onUserExists.subscribe(_ => {
      this.snackBar.open('Member already added.', 'Close', { duration: 2000 });
    });
  }

  onCreateForm() {
    const paymentArr = this.payments.filter(payment => payment.month.value === this.month.value);
    if (paymentArr.length === 0) {
      this.paymentService.onCreatePayment.next({ month: this.month, total: this.total.value});
      this.createForm.reset();
    } else {
      this.snackBar.open('Payment already exists.', 'Close', { duration: 2000 });
    }
  }

  onChange(member) {
    this.buttonDisabled = false;
    this.paymentService.onAddMember.next(member);
  }
}
