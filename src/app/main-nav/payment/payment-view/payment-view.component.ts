import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable} from 'rxjs';

import { User } from '../../../models/user.models';
import { Payee } from '../../../models/payment.models';

@Component({
  selector: 'app-payment-view',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.css']
})
export class PaymentViewComponent implements OnInit {
  private usersCollection: AngularFirestoreCollection<User>;
  private userListObs: Observable<User[]>;

  users: User[] = [];
  payees: Payee[] = [];
  showPaymentList = false;
  monthOf: string;
  monthId;

  constructor(private route: ActivatedRoute,
              private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection<User>('users');
    this.userListObs = this.usersCollection.valueChanges();
  }

  ngOnInit() {
    this.monthId = this.route.snapshot.params['monthId'];
    this.userListObs.subscribe((users: User[]) => {
      this.users = users;
    });
    // const payment = this.paymentService.getPaymentByMonthId(+this.monthId);
    // if (payment) {
    //   this.monthOf = payment.month.viewValue;
    //   this.initializePayees(this.users, payment.total);
    // }
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
