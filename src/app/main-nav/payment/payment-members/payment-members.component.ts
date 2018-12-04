import { Component, OnInit } from '@angular/core';

import { Member } from '../../../services/members.service';
import {PaymentsService} from '../../../services/payments.service';

@Component({
  selector: 'app-payment-members',
  templateUrl: './payment-members.component.html',
  styleUrls: ['./payment-members.component.css']
})
export class PaymentMembersComponent implements OnInit {
  paymentMembers: Member[] = [];

  constructor(private paymentService: PaymentsService) { }

  ngOnInit() {
    this.paymentService.onPaymentMemberAdd.subscribe(member => {
      this.paymentMembers.push(member);
    });

    this.paymentService.onCreatePayment.subscribe(_ => {
      this.paymentService.onAddPaymentMembers.next(this.paymentMembers);
      this.paymentMembers = [];
    });
  }

  remove(member) {
    const index = this.paymentMembers.indexOf(member);
    if (index > -1) {
      this.paymentMembers.splice(index);
    }
  }
}
