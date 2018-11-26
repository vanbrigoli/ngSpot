import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UsersService } from '../../../services/users.service';
import { PaymentService, Payment } from '../../../services/payment.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  payments: Payment[] = [];

  constructor(private usersService: UsersService,
              private paymentService: PaymentService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.payments = this.paymentService.paymentList;
    this.paymentService.onPaymentAddedEvent.subscribe((payments: Payment[]) => {
      this.payments = payments;
    });
  }

  toPaymentView(monthId: number) {
    this.router.navigate([monthId], { relativeTo: this.route });
  }
}
