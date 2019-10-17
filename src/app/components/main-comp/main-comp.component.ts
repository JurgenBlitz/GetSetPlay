// Angular basic dependencies
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
// Drag and Drop
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
// Modals
import { MatDialog } from '@angular/material';
import { ConfirmActionModalComponent } from '../modals/confirm-action-modal/confirm-action.modal';
import { SetTimerModalComponent } from '../modals/set-timer-modal/set-timer.modal';
import { EditSetnameModalComponent } from '../modals/edit-setname-modal/edit-setname.modal';
// Models
import { Song } from '../../../models/song';
// Form
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  // tslint:disable-next-line
  selector: 'main-comp',
  templateUrl: './main-comp.component.html',
  styleUrls: ['./main-comp.component.css']
})
export class MainCompComponent implements OnInit, OnChanges {

  @Input() timeLeft: any;

  public title = 'Build your awesome setlist';

  public formGroup: FormGroup;
  public nameControl: AbstractControl;
  public durationControl: AbstractControl;
  public songData: Song;
  public mask = [/\d/, /\d/, ':', /\d/, /\d/];
  public songs = [];

  // Values used for time supervision in the template
  public timeAlmostOut: boolean;
  public notEnoughTime: boolean;

  // Values used for time measurement
  public initialTime: string;
  public initialTimeMls: number;
  // String variables
  public timeToPlayString: string;
  public setListName: string;

  public millisecs = (mins, secs) => ((mins * 60) + secs) * 1000;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.setListName = 'My setlist';
    this.timeAlmostOut = false;
    this.notEnoughTime = false;
    this.initializeForm();
  }

  ngOnInit() {
    this.openSetTimerModal();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.timeAlmostOut = this.timeLeft <= 180000 ? true : false;
    console.log(this.timeAlmostOut);
  }

  /**
   * Opens a modal to set the initial time for the setlist. This value is necessary for the app¡'s flow.
   * The modal cannot be closed clicking outside its bounds or by a manual 'No' button.
   * The input has to be filled in to close it.
   */
  openSetTimerModal(): void {
    const timerRef = this.dialog.open(SetTimerModalComponent,  {
      width: '500px',
      height: '300px',
      autoFocus: true,
      data: {time: this.initialTime},
      position: {
        top: '150px'
      }
    });
    timerRef.afterClosed().subscribe(result => {
      if (result.includes('_')) {
        result.replace(/_/gi, '');
      }
      this.timeToPlayString = result.split(' ')[0];
      this.initialTime = this.timeToPlayString;
      this.starterTimeToMls(this.timeToPlayString);
      this.initializeForm();
    });
  }

  // Stores the assigned setlist time to Mls, for next operations
  public starterTimeToMls(time) {
    this.timeLeft = this.millisecs(Number(time), 0);
    this.initialTimeMls = this.timeLeft;
  }

  public initializeForm() {
    const songTitlePattern: RegExp = /^[-!#$%&'*,.\/ \/ç:+0-9=?A-Z^_a-z]{2,40}$/;
    const minsAndSecsPattern: RegExp = /^[0-5]\d:[0-5]\d$/;
    this.formGroup = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(40), Validators.pattern(songTitlePattern)]],
      duration: [null, [Validators.required, Validators.maxLength(5), Validators.pattern(minsAndSecsPattern)]]
    });
    this.nameControl = this.formGroup.get('name');
    this.durationControl = this.formGroup.get('duration');
  }

  // Opens a modal to edit the set's name. The input is optional in this case.
  // The modal can be closed at any time.
  public editSetName() {
    const editSetnameRef = this.dialog.open(EditSetnameModalComponent, {
      width: '500px',
      height: '200px',
      position: {
        top: '150px'
      }
    });
    editSetnameRef.afterClosed().subscribe(result => {
      if (result !== '') {
        this.setListName = result;
      }
    });
  }

  // Submits an entry. Clears inputs right away to re-use
  public submitSong(event) {
    if (this.formGroup.valid) {
      const songInfo: Song = {
        name: this.nameControl.value,
        duration: this.durationControl.value,
        durationMls: this.millisecs(
          Number(this.durationControl.value.split(':')[0]),
          Number(this.durationControl.value.split(':')[1]))
      };
      if ((this.timeLeft - songInfo.durationMls) >= 0) {
        /**
         * Pushes the result onto the list as long as there was enough time left.
         * Then, substracts the entry's time to the total time available to parse it as a string
         */
        this.songs.push(songInfo);
        this.substractTime(this.timeLeft, songInfo.durationMls);
      } else {
        // Triggers the boolean that shows the alert for no time available.
        // Prevents the entry from entering the list.
        this.notEnoughTime = true;
      }
      this.nameControl.setValue('');
      this.durationControl.setValue('');
      event.preventDefault();
    }
  }


  // Substract the time of the last entrey from the original value
  public substractTime(starterTime, songTime) {
    const timeLeftMls = starterTime - songTime;
    this.timeLeft = timeLeftMls;
    this.timeAlmostOut = this.timeLeft <= 180000 ? true : false;
    this.msToTime(timeLeftMls);
  }

  // Transforms Mls to a 'mm:ss' string to be displayed in the template
  public msToTime(duration) {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const finalminutes = (minutes < 10) ? '0' + minutes : minutes;
    const finalseconds = (seconds < 10) ? '0' + seconds : seconds;

    this.timeToPlayString = finalminutes + ':' + finalseconds;
}

  // Deletes the selected song from the list
  public deleteChosenSong(index) {
    this.songs.splice(index, 1);
    if (this.songs.length > 0) {
      const currentSetDuration = this.songs.reduce(( sum, { durationMls } ) => sum + durationMls , 0);
      this.timeLeft = (this.initialTimeMls - currentSetDuration);
      this.msToTime(this.timeLeft);
    } else {
      this.deleteSet();
    }
    this.timeAlmostOut = this.timeLeft <= 180000 ? true : false;
    this.notEnoughTime = false;
  }

  // Purges the entire setlist, resets initial timer
  public deleteSet() {
    const resetTimer = this.millisecs(Number(this.initialTime), 0);
    this.timeLeft = resetTimer;
    this.msToTime(resetTimer);
    this.songs = [];
  }

  exportPdf() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
          'data': JSON.stringify('vamos a hacer una prueba')
      }
    };
    this.router.navigate(['exportpdf'], navigationExtras);
  }

  // Handles the repositioning of items in the columns
  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }


  // Opens a modal to ask for confirmation to delete specific actions.
  openConfirmModal(): void {
    const confirmAction = this.dialog.open(ConfirmActionModalComponent, {
      width: '500px',
      height: '200px',
      position: {
        top: '150px'
      }
    });
    confirmAction.afterClosed().subscribe(result => {
      if (result) {
        this.deleteSet();
      }
    });
  }
}
