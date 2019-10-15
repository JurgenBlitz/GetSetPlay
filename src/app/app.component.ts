// Angular basic dependencies
import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
// Models
import { Song } from '../models/song';
// Form
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public formGroup: FormGroup;
  public nameControl: AbstractControl;
  public durationControl: AbstractControl;
  public songData: Song;

  title = 'Build your awesome setlist';

  public songs = [];

  // Values used for time supervision in the template
  public timeAlmostOut: boolean;
  public notEnoughTime: boolean;

  // Values used for time measurement
  public initialTime: any;
  public initialTimeMls: number;
  public timeToPlayString: string;
  public timeLeft: any;

  public millisecs = (mins, secs) => ((mins * 60) + secs) * 1000;


  constructor(private formBuilder: FormBuilder) {
    this.timeAlmostOut = false;
    this.notEnoughTime = false;
    this.timeToPlayString = '30';
    this.initialTime = this.timeToPlayString;
    this.starterTimeToMls(this.timeToPlayString);
    this.initializeForm();
  }

  // Stores the assigned setlist time to Mls, for next operations
  public starterTimeToMls(time) {
    this.timeLeft = this.millisecs(Number(time), 0);
    this.initialTimeMls = this.timeLeft;
  }

  public initializeForm() {
    this.formGroup = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(40)]],
      duration: [null, Validators.required]
    });
    this.nameControl = this.formGroup.get('name');
    this.durationControl = this.formGroup.get('duration');
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

  // Handles the repositioning of items in the columns
  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
