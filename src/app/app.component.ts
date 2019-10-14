// Angular basic dependencies
import { Component } from '@angular/core';
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
  // TODO: Establish an array for the song lengths
  public timeToPlay: string;

  public millisecs = (mins, secs) => ((mins * 60) + secs) * 1000;


  constructor(private formBuilder: FormBuilder) {
    this.timeToPlay = '30';
    this.initializeForm();
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
        duration: this.durationControl.value
      };
      this.songs.push(songInfo);
      this.adjustRemainingTime(this.durationControl.value);
      this.nameControl.setValue('');
      this.durationControl.setValue('');
      event.preventDefault();
    }
  }

  public adjustRemainingTime(lastSongTime) {

    const chosenSongMinsValue = Number(lastSongTime.split(':')[0]);
    const chosenSongSecsValue = Number(lastSongTime.split(':')[1]);

    const starterTimeMinsValue = Number(this.timeToPlay.split(':')[0]);
  //  const starterTimeSecsValue = Number(this.timeToPlay.split(':')[1]);
  /**
   *  Uncomment line above if the initial time requires seconds.
   * It will unlikely ever happen because bands almost always get their time to play
   * in minutes, or hours and minutes
   */

    this.substractTime(starterTimeMinsValue, chosenSongMinsValue, chosenSongSecsValue);
  }

  public substractTime(starterMins, chosenMins, chosenSecs) {
    const timeLeftMls = (this.millisecs(starterMins, 0) -
    this.millisecs(chosenMins, chosenSecs));
    this.msToTime(timeLeftMls);
  }

  public msToTime(duration) {

    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);

    const finalminutes = (minutes < 10) ? '0' + minutes : minutes;
    const finalseconds = (seconds < 10) ? '0' + seconds : seconds;

    this.timeToPlay = finalminutes + ':' + finalseconds;
}

  // Deletes the selected song from the list
  public deleteChosenSong(index) {
    this.songs.splice(index, 1);
  }

  public deleteSet() {
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
