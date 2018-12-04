import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Payment } from '../../../models/payment.models';
import { PaymentsService } from '../../../services/payments.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  @Input() payments: Payment[] = [];
  @Output() showPaymentView = new EventEmitter<Payment>();

  constructor(private paymentService: PaymentsService) {
  }

  ngOnInit() {
  }

  toPaymentView(payment: Payment) {
    this.showPaymentView.emit(payment);
  }

  changeTooltipMsg(payment: Payment) {
    return `Go to payment view for ${payment.month.viewValue}`;
  }

  deletePayment(uuid) {
    this.paymentService.onDeletePayment(uuid);
  }
}
