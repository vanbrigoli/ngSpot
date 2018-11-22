import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';

import { User, UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['select', 'firstName', 'lastName', 'dateJoined'];
  dataSource;
  users: User[] = [];
  selection = new SelectionModel<User>(true, []);

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.users = this.usersService.users;
    this.dataSource = new MatTableDataSource<User>(this.users);
    this.usersService.usersChangeEvent.subscribe((users: User[]) => {
      this.users = users;
      this.dataSource = new MatTableDataSource<User>(this.users);
    });
  }
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
