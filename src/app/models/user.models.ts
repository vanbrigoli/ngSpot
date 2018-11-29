export class AppUser {
  constructor(public displayName: string, public uid: string, public email: string) {}
}

export class Member {
  constructor(public firstName: string, public lastName: string, public dateJoined: Date, public memberOf: string) {}
}
