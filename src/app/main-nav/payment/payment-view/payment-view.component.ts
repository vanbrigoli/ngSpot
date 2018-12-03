import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { Member } from '../../../models/user.models';
import { Payee, Payment } from '../../../models/payment.models';
import { SharePayment } from '../../../models/share-view.models';

@Component({
  selector: 'app-payment-view',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.css']
})
export class PaymentViewComponent implements OnInit {
  @Input() members: Member[] = [];
  @Input() payment: Payment;
  @Output() returnToPayView = new EventEmitter<void>();
  private payeesCollection: AngularFirestoreCollection<SharePayment>;
  private payeesListObs: Observable<any[]>;

  payees: Payee[] = [];
  monthOf: string;

  constructor(private afs: AngularFirestore, private router: Router) {
    this.payeesCollection = this.afs.collection<SharePayment>('payees');
    this.payeesListObs = this.payeesCollection.snapshotChanges()
      .pipe(map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data();
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      }));
  }

  ngOnInit() {
    this.monthOf = this.payment.month.viewValue;
    this.initializePayees(this.members, this.payment.total);
  }

  initializePayees(members: Member[], total) {
    const membersLength = members.length;
    members.forEach(user => {
      const fullName = `${user.firstName} ${user.lastName}`;
      this.payees.push(new Payee(fullName, total / membersLength, false));
    });
  }

  toPayView() {
    this.returnToPayView.emit();
  }

  sharePaymentView() {
    this.payeesListObs.subscribe(payees => {
      const payeesArr = payees.filter(payee => {
        return payee.month.value === this.payment.month.value
          && payee.userUuid === this.payment.createdBy;
      });
      if (payeesArr.length === 0) {
        this.addSharePayment();
        this.router.navigate(['/share'], { queryParams:
            { paymentMonth: this.payment.month.value,
              createdBy: this.payment.createdBy }});
      } else {
        const shr = this.payeesCollection.doc<SharePayment>(payeesArr[0].id);
        shr.update({ payees: JSON.parse(JSON.stringify(this.payees)) });
        this.router.navigate(['/share'], { queryParams:
            { paymentMonth: this.payment.month.value,
              createdBy: this.payment.createdBy }});
      }
    });
  }

  private addSharePayment() {
    this.payeesCollection.add(JSON.parse(JSON.stringify(new SharePayment(
      this.payment.month, this.payees, this.payment.createdBy
    ))));
  }
}
