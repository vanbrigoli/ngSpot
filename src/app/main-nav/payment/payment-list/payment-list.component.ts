import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Payment } from '../../../models/payment.models';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  @Input() payments: Payment[] = [];
  @Output() showPaymentView = new EventEmitter<Payment>()

  constructor() {
  }

  ngOnInit() {
  }

  toPaymentView(payment: Payment) {
    this.showPaymentView.emit(payment);
  }

  changeTooltipMsg(payment: Payment) {
    return `Go to payment view for ${payment.month.viewValue}`;
  }
}
