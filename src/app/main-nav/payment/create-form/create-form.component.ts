import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentService, Month, Payment } from '../../../services/payment.service';
import { ActivatedRoute, Router } from '@angular/router';


const MONTHS: Month[] = [
  { value: 0, viewValue: 'January' },
  { value: 1, viewValue: 'February' },
  { value: 2, viewValue: 'March' },
  { value: 3, viewValue: 'April' },
  { value: 4, viewValue: 'May' },
  { value: 5, viewValue: 'June' },
  { value: 6, viewValue: 'July' },
  { value: 7, viewValue: 'August' },
  { value: 8, viewValue: 'September' },
  { value: 9, viewValue: 'October' },
  { value: 10, viewValue: 'November' },
  { value: 11, viewValue: 'December' }
];


@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {
  createForm;
  month: FormControl;
  total: FormControl;
  months: Month[] = MONTHS;
  payments: Payment[] = [];

  constructor(private paymentService: PaymentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.createForm = new FormGroup({
      'month': new FormControl('', [Validators.required]),
      'total': new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')])
    });
    this.month = this.createForm.get('month');
    this.total = this.createForm.get('total');
    this.payments = this.paymentService.payments;
  }

  onCreateForm() {
    this.payments.push({ total: this.total.value,
      month: { value: this.month.value, viewValue:  MONTHS[this.month.value].viewValue} });
    this.paymentService.addPayment([...this.payments]);
    this.router.navigate([this.month.value], { relativeTo: this.route });
    this.createForm.reset();
  }
}
