import { Subject } from 'rxjs';

export class Payee {
  constructor(public fullName: string, public amount: number, public paid: boolean) {}
}

export interface Payment {
  month: number;
  total: number;
}

export class PaymentService {
  onFormCreationEvent = new Subject<Payment>();

  constructor() {}
}
