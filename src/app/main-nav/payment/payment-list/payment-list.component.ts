import { Component, OnInit } from '@angular/core';
import { UsersService, User } from '../../../services/users.service';
import { PaymentService, Payee, Payment } from '../../../services/payment.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  users: User[] = [];
  payees: Payee[] = [];
  showPaymentList = false;

  constructor(private usersService: UsersService, private paymentService: PaymentService) { }

  ngOnInit() {
    this.users = this.usersService.users;
    this.usersService.usersChangeEvent.subscribe((users: User[]) => {
      this.users = users;
    });

    this.paymentService.onFormCreationEvent.subscribe((payment: Payment) => {
      this.showPaymentList = true;
      this.initializePayees(this.users, payment);
    });
  }

  initializePayees(users: User[], { total }) {
    const userLength = users.length;
    users.forEach(user => {
      const fullName = `${user.firstName} ${user.lastName}`;
      this.payees.push(new Payee(fullName, total / userLength, false));
    });
  }

}
