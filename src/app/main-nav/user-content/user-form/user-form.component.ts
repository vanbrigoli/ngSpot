import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User, UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  users: User[] = [];
  userForm;
  firstName;
  lastName;
  dateJoined;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.users = this.usersService.users;
    this.userForm = new FormGroup({
      'firstName': new FormControl('', [Validators.required]),
      'lastName': new FormControl('', [Validators.required]),
      'dateJoined': new FormControl({value: ''}, [Validators.required])
    });
    this.firstName = this.userForm.get('firstName');
    this.lastName = this.userForm.get('lastName');
    this.dateJoined = this.userForm.get('dateJoined');
  }

  onAddUser() {
    const newUser = new User(this.firstName, this.lastName, this.dateJoined);
    this.usersService.addUser(newUser);
  }
}
