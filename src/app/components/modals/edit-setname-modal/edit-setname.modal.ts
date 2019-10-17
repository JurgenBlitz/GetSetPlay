import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';


export interface DialogData {
  setName: string;
}

@Component({
  // tslint:disable-next-line
  selector: 'edit-setname.modal',
  templateUrl: './edit-setname.modal.html',
  styleUrls: ['./edit-setname.modal.css'],
})
export class EditSetnameModalComponent implements OnInit {

  public form: FormGroup;
  public setNameControl: AbstractControl;

  constructor(
    public dialogRef: MatDialogRef<EditSetnameModalComponent>,
    private formBuilder: FormBuilder
  ) {}

    ngOnInit()  {
      const songTitlePattern: RegExp = /^[-!#$%&'*,.\/ \/ç:+0-9=?A-Z^_a-z]{2,40}$/;
      this.form = this.formBuilder.group({
        setName: [null, [Validators.pattern(songTitlePattern)]]
      });
      this.setNameControl = this.form.get('setName');
    }

    submit() {
      const chosenTitle = this.setNameControl.value;
      this.dialogRef.close(chosenTitle);
    }

  onNoClick(): void {
    this.setNameControl.setValue('');
    this.dialogRef.close();
  }

}
