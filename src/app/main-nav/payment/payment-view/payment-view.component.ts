import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatCheckboxChange } from '@angular/material';

import { Payment } from '../../../models/payment.models';
import {PaymentsService} from '../../../services/payments.service';

@Component({
  selector: 'app-payment-view',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.css']
})
export class PaymentViewComponent implements OnInit {
  @Input() payment: Payment;
  @Output() returnToPayView = new EventEmitter<void>();

  monthOf;
  payees;

  constructor(private paymentService: PaymentsService,
              private router: Router) {}

  ngOnInit() {
    this.monthOf = this.payment.month.viewValue;
    this.payees = this.payment.payees;
  }

  toPayView() {
    this.returnToPayView.emit();
  }

  sharePaymentView() {
    this.router.navigate(['/share'], { queryParams:
        { paymentMonth: this.payment.month.value,
          createdBy: this.payment.createdBy }});
  }

  onChkChange(ev: MatCheckboxChange, uuid) {
    this.payees.forEach(payee => {
      if (payee.uuid === uuid) {
        payee.paid = ev.checked;
      }
    });
    this.paymentService.onEditPaid(this.payees, this.payment['id']);
  }
}
