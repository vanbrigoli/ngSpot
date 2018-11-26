import { Subject } from 'rxjs';

export class Payee {
  constructor(public fullName: string, public amount: number, public paid: boolean) {}
}

export interface Month {
  value: number;
  viewValue: string;
}

export interface Payment {
  month: Month;
  total: number;
  resolve: boolean;
}

export class PaymentService {
  onPaymentAddedEvent = new Subject<Payment[]>();
  paymentList: Payment[] = [];

  constructor() {}

  get payments() {
    return this.paymentList.slice();
  }

  addPayment(payments: Payment[]) {
    this.paymentList = payments;
  }

  getPaymentByMonthId(monthId: number): Payment | null {
    for (const payment of this.paymentList) {
      if (payment.month.value === monthId) {
        return payment;
      }
    }
    return null;
  }
}
