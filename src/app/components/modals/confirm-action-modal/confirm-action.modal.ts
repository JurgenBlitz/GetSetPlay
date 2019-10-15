import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  time: string;
}

@Component({
  // tslint:disable-next-line
  selector: 'confirm-action.modal',
  templateUrl: './confirm-action.modal.html',
  styleUrls: ['./confirm-action.modal.css'],
})
export class ConfirmActionModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmActionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  continue() {
    const confirm = 'confirm';
    this.dialogRef.close(confirm);
    console.log();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
