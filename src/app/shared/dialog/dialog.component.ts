import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  ins;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
    if (data.hasOwnProperty('firstName')) {
      this.ins = {
        data: `${data.firstName} ${data.lastName}`,
        id: data.id
      };
    } else {
      this.ins = {
        data: `${data.month.viewValue}`,
        id: data.id
      };
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
