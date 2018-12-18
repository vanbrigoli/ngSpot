import { Component, OnInit } from '@angular/core';

import { Member } from '../../../services/members.service';
import { PaymentsService } from '../../../services/payments.service';

@Component({
  selector: 'app-payment-members',
  templateUrl: './payment-members.component.html',
  styleUrls: ['./payment-members.component.css']
})
export class PaymentMembersComponent implements OnInit {
  paymentMembers: Member[] = [];

  constructor(private paymentService: PaymentsService) { }

  ngOnInit() {
    this.paymentService.onAddMember.subscribe(member => {
      const found = this.paymentMembers.find(paymentMember =>
        paymentMember.firstName === member.firstName && paymentMember.lastName === member.lastName)

      if (!!found) {
        this.paymentService.onUserExists.next();
      } else {
        this.paymentMembers.push(member);
      }
    });
  }

  remove(member) {
    const index = this.paymentMembers.indexOf(member);
    if (index > -1) {
      this.paymentMembers.splice(index, 1);
      this.paymentService.onAddPaymentMembers.next(this.paymentMembers);
    }
  }
}
