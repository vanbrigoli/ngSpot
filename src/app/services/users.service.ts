import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

export class User {
  constructor(public firstName: string, public lastName: string, public dateJoined: Date) {}
}

@Injectable()
export class UsersService {
  usersChangeEvent = new Subject<User[]>();
  private userList: User[] = [];

  constructor() { }

  addUser(user: User) {
    this.userList.push(user);
    this.usersChangeEvent.next([...this.userList]);
  }

  get users() {
    return this.userList.slice();
  }
}
