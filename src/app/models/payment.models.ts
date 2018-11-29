export class Payee {
  constructor(public fullName: string, public amount: number, public paid: boolean) {}
}

export class Month {
  constructor(public value: number, public viewValue: string) {}
}

export class Payment {
  constructor(public month: Month, public total: number, public resolve: boolean, public createdBy: string) {}
}

export const MONTHS: Month[] = [
  { value: 0, viewValue: 'January' },
  { value: 1, viewValue: 'February' },
  { value: 2, viewValue: 'March' },
  { value: 3, viewValue: 'April' },
  { value: 4, viewValue: 'May' },
  { value: 5, viewValue: 'June' },
  { value: 6, viewValue: 'July' },
  { value: 7, viewValue: 'August' },
  { value: 8, viewValue: 'September' },
  { value: 9, viewValue: 'October' },
  { value: 10, viewValue: 'November' },
  { value: 11, viewValue: 'December' }
];
