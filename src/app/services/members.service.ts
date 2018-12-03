import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class Member {
  constructor(public firstName: string, public lastName: string, public dateJoined: Date, public memberOf: string) {}
}

@Injectable()
export class MembersService {
  editMemberEvent = new Subject<Member>();

  constructor() { }

  static capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
