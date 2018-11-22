import { Component } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';

export interface User {
  position: number;
  firstname: string;
  lastname: string;
}

const USER_DATA: User[] = [
  {position: 1, firstname: 'Giovanni', lastname: 'Brigoli'},
  {position: 2, firstname: 'Helium', lastname: 'Brigoli'},
  {position: 3, firstname: 'Lithium', lastname: 'Brigoli'},
  {position: 4, firstname: 'Beryllium', lastname: 'Brigoli'},
  {position: 1, firstname: 'Giovanni', lastname: 'Brigoli'},
  {position: 2, firstname: 'Helium', lastname: 'Brigoli'},
];

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  displayedColumns: string[] = ['select', 'position', 'firstname', 'lastname', 'action'];
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
