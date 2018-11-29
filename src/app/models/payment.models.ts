export class Payee {
  constructor(public fullName: string, public amount: number, public paid: boolean) {}
}

export class Month {
  constructor(public value: number, public viewValue: string) {}
}

export class Payment {
  constructor(public month: Month, public total: number, public resolve: boolean, public createdBy: string) {}
}
