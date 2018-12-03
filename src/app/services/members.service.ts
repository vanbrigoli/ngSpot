import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Member } from '../models/user.models';

@Injectable()
export class MembersService {
  editMemberEvent = new Subject<Member>();

  constructor() { }
}
