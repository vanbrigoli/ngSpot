import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  monthId;
  showForm = true;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.monthId = this.route.snapshot.params['monthId'];
    this.showCreateForm(this.monthId);
    this.route.params.subscribe((params: Params) => {
      this.monthId = params['monthId'];
      this.showCreateForm(this.monthId);
    });
  }

  showCreateForm(monthId: number) {
    if (monthId) {
      this.showForm = false;
    }
  }
}
