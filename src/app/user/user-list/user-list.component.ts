import { Component } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';

export interface User {
  firstname: string;
  lastname: string;
}

const USER_DATA: User[] = [
  { firstname: 'Giovanni', lastname: 'Brigoli' },
  { firstname: 'Helium', lastname: 'Brigoli' },
  { firstname: 'Lithium', lastname: 'Brigoli' },
  { firstname: 'Beryllium', lastname: 'Brigoli' },
  { firstname: 'Giovanni', lastname: 'Brigoli' },
  { firstname: 'Helium', lastname: 'Brigoli' },
  { firstname: 'Giovanni', lastname: 'Brigoli' },
  { firstname: 'Helium', lastname: 'Brigoli' },
  { firstname: 'Lithium', lastname: 'Brigoli' },
  { firstname: 'Beryllium', lastname: 'Brigoli' },
  { firstname: 'Giovanni', lastname: 'Brigoli' },
  { firstname: 'Helium', lastname: 'Brigoli' },
  { firstname: 'Giovanni', lastname: 'Brigoli' },
  { firstname: 'Helium', lastname: 'Brigoli' },
  { firstname: 'Lithium', lastname: 'Brigoli' },
  { firstname: 'Beryllium', lastname: 'Brigoli' },
  { firstname: 'Giovanni', lastname: 'Brigoli' },
  { firstname: 'Helium', lastname: 'Brigoli' },
];

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  displayedColumns: string[] = ['select', 'firstname', 'lastname'];
  dataSource = new MatTableDataSource<User>(USER_DATA);
  selection = new SelectionModel<User>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
