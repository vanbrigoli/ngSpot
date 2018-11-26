import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable} from 'rxjs';

import { User } from '../../../models/user.models';
import { Payee, Payment } from '../../../models/payment.models';

@Component({
  selector: 'app-payment-view',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.css']
})
export class PaymentViewComponent implements OnInit {
  private usersCollection: AngularFirestoreCollection<User>;
  private userListObs: Observable<User[]>;
  private paymentCollection: AngularFirestoreCollection<Payment>;
  private paymentListObs: Observable<Payment[]>;

  users: User[] = [];
  payees: Payee[] = [];
  showPaymentList = false;
  monthOf: string;
  monthId;

  constructor(private route: ActivatedRoute,
              private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection<User>('users');
    this.userListObs = this.usersCollection.valueChanges();
    this.paymentCollection = this.afs.collection<Payment>('payments');
    this.paymentListObs = this.paymentCollection.valueChanges();
  }

  ngOnInit() {
    this.monthId = this.route.snapshot.params['monthId'];
    this.userListObs.subscribe((users: User[]) => {
      this.users = users;
    });
    const paymentQuery = this.paymentCollection.ref.where('month.value', '==', +this.monthId);
    paymentQuery.get().then((querySnaphot) => {
      querySnaphot.forEach((doc) => {
        if (doc) {
          const payment = doc.data();
          this.monthOf = payment.month.viewValue;
          this.initializePayees(this.users, payment.total);
        }
      });
    });
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
