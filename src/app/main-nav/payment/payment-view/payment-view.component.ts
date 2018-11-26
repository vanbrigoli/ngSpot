import { Component, OnInit } from '@angular/core';
import { User, UsersService } from '../../../services/users.service';
import { Payee, PaymentService } from '../../../services/payment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-view',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.css']
})
export class PaymentViewComponent implements OnInit {
  users: User[] = [];
  payees: Payee[] = [];
  showPaymentList = false;
  monthOf: string;
  monthId;

  constructor(private usersService: UsersService,
              private paymentService: PaymentService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.monthId = this.route.snapshot.params['monthId'];
    this.users = this.usersService.users;
    const payment = this.paymentService.getPaymentByMonthId(+this.monthId);
    if (payment) {
      this.monthOf = payment.month.viewValue;
      this.initializePayees(this.users, payment.total);
    }
  }

  initializePayees(users: User[], total) {
    const userLength = users.length;
    users.forEach(user => {
      const fullName = `${user.firstName} ${user.lastName}`;
      this.payees.push(new Payee(fullName, total / userLength, false));
    });
    this.showPaymentList = true;
  }
}
