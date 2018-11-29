import { Month, Payee } from './payment.models';

export class SharePayment {
  constructor(public month: Month, public payees: Payee[], public userUuid: string) {}
}
