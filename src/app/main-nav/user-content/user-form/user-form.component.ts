import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { User, UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  users: User[] = [];
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  dateJoined = new FormControl({value: '', disabled: true}, [Validators.required]);

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.users = this.usersService.users;
  }

  onAddUser() {
    const newUser = new User(this.firstName.value, this.lastName.value, this.dateJoined.value);
    this.usersService.addUser(newUser);
  }
}
