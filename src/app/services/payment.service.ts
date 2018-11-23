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
}

export class PaymentService {
  onFormCreationEvent = new Subject<Payment>();

  constructor() {}
}
