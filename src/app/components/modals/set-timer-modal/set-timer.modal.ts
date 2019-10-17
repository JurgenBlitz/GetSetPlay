import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
  // tslint:disable-next-line
  selector: 'set-timer.modal',
  templateUrl: './set-timer.modal.html',
  styleUrls: ['./set-timer.modal.css'],
})

export class SetTimerModalComponent implements OnInit {

  public form: FormGroup;
  public timeControl: AbstractControl;

  public mask = createNumberMask({
  prefix: '',
  suffix: '',
  integerLimit: 3
});

  constructor(
    public dialogRef: MatDialogRef<SetTimerModalComponent>,
    private formBuilder: FormBuilder
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    const timerPattern: RegExp = /^[0-9]{2,3}$/;
    this.form = this.formBuilder.group({
      initialTime: [null, [Validators.required, Validators.pattern(timerPattern)]]
    });
    this.timeControl = this.form.get('initialTime');
  }

  submit() {
    const chosenTime = this.timeControl.value;
    this.dialogRef.close(chosenTime);
  }

  onNoClick(): void {
    return null;
  }

}
