import { Component, OnInit } from '@angular/core';

import { User, UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.users = this.usersService.users;
    this.usersService.usersChangeEvent.subscribe((users: User[]) => {
      this.users = users;
    });
  }
}
