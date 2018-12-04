import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { MatCheckboxChange } from '@angular/material';

import { Member } from '../../../services/members.service';
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
  payeesForPayment;

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

    this.payeesListObs.subscribe(payees => {
      this.payeesForPayment = payees.filter(payee => {
        return payee.month.value === this.payment.month.value
          && payee.userUuid === this.payment.createdBy;
      });
      if (this.payeesForPayment.length === 0) {
        this.initializePayees(this.members, this.payment.total);
      } else {
        this.payees = this.payeesForPayment[0].payees;
        if (this.payees.length === 0) {
          this.initializePayees(this.members, this.payment.total);
        } else {
          // TODO: Check if member exists and update
        }
      }
    });
  }

  initializePayees(members: Member[], total) {
    const membersLength = members.length;
    members.forEach(member => {
      const fullName = `${member.firstName} ${member.lastName}`;
      this.payees.push(new Payee(fullName, total / membersLength, false, member['id']));
    });
    const shr = this.payeesCollection.doc<SharePayment>(this.payeesForPayment[0].id);
    shr.update({ payees: JSON.parse(JSON.stringify(this.payees)) });
  }

  toPayView() {
    this.returnToPayView.emit();
  }

  sharePaymentView() {
    if (this.payeesForPayment.length === 0) {
      this.addSharePayment();
      this.router.navigate(['/share'], { queryParams:
          { paymentMonth: this.payment.month.value,
            createdBy: this.payment.createdBy }});
    } else {
      const shr = this.payeesCollection.doc<SharePayment>(this.payeesForPayment[0].id);
      shr.update({ payees: JSON.parse(JSON.stringify(this.payees)) })
        .then(() => {
          this.router.navigate(['/share'], { queryParams:
              { paymentMonth: this.payment.month.value,
                createdBy: this.payment.createdBy }});
        });
    }
  }

  onChkChange(ev: MatCheckboxChange, memberUuid) {
    const shr = this.payeesCollection.doc<SharePayment>(this.payeesForPayment[0]['id']);
    this.payees.forEach(payee => {
      if (payee.Id === memberUuid) {
        payee.paid = ev.checked;
      }
    });
    shr.update({ payees: JSON.parse(JSON.stringify(this.payees)) });
  }

  private addSharePayment() {
    this.payeesCollection.add(JSON.parse(JSON.stringify(new SharePayment(
      this.payment.month, this.payees, this.payment.createdBy
    ))));
  }
}
