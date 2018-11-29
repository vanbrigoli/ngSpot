import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Payee } from '../models/payment.models';

@Injectable({
  providedIn: 'root'
})
export class ShareViewService {
  sharePaymentViewEvent = new Subject<Payee[]>();

  constructor() { }
}
