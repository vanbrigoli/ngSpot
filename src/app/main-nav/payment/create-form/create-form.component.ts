import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {PaymentService} from '../../../services/payment.service';

interface Month {
  value: number;
  viewValue: string;
}

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

  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
    this.createForm = new FormGroup({
      'month': new FormControl('', [Validators.required]),
      'total': new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')])
    });
    this.month = this.createForm.get('month');
    this.total = this.createForm.get('total');
  }

  onCreateForm() {
    this.paymentService.onFormCreationEvent.next({ total: this.total.value, month: this.month.value });
  }
}
