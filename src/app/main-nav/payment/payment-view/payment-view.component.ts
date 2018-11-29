import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Member } from '../../../models/user.models';
import { Payee, Payment } from '../../../models/payment.models';

@Component({
  selector: 'app-payment-view',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.css']
})
export class PaymentViewComponent implements OnInit {
  @Input() members: Member[] = [];
  @Input() payment: Payment;
  @Output() returnToPayView = new EventEmitter<void>();

  payees: Payee[] = [];
  monthOf: string;

  constructor() {
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
}
