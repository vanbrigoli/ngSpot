import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { Payment } from '../../../models/payment.models';
import { PaymentsService } from '../../../services/payments.service';
import { DialogComponent } from '../../../shared/dialog/dialog.component';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  @Input() payments: Payment[] = [];
  @Output() showPaymentView = new EventEmitter<Payment>();

  constructor(private paymentService: PaymentsService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  toPaymentView(payment: Payment) {
    this.showPaymentView.emit(payment);
  }

  changeTooltipMsg(payment: Payment) {
    return `Go to payment view for ${payment.month.viewValue}`;
  }

  deletePayment(payment) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: payment
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.paymentService.onDeletePayment(result).then(_ => {
          this.snackBar.open('Payment deleted.', 'Close', { duration: 2000 });
        });
      }
    });
  }
}
