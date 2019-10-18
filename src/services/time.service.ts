import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeReturnData } from '../models/timeReturn';

@Injectable({
  providedIn: 'root'
})

export class TimeService {

  public timeString: string;
  public timeMilliseconds: number;
  public timeAlmostOut: boolean;
  public timeToPlayString;
  public millisecs = (mins, secs) => ((mins * 60) + secs) * 1000;

  constructor() { }

  // Stores the assigned setlist time to Mls, for next operations
  public starterTimeToMls(time) {
    const timeToMls = this.millisecs(Number(time), 0);
    const timeObservable = new Observable(observer => {
      observer.next(timeToMls);
    });
    return timeObservable;
  }

  // Substract the time of the last entrey from the original value
  public substractTime(starterTime, songTime) {
    const timeLeftMls = starterTime - songTime;
/*     this.timeLeft = timeLeftMls */
    this.timeAlmostOut = timeLeftMls <= 180000 ? true : false;
    this.msToTime(timeLeftMls);

    const timeReturn: TimeReturnData = {
      timeString: this.timeToPlayString,
      timeInMls: timeLeftMls
    };

    const timeReturnObservable = new Observable(observer => {
      observer.next(timeReturn);
    });
    return timeReturnObservable;
  }

  // Transforms Mls to a 'mm:ss' string to be displayed in the template
  public msToTime(duration) {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const finalminutes = (minutes < 10) ? '0' + minutes : minutes;
    const finalseconds = (seconds < 10) ? '0' + seconds : seconds;

    this.timeToPlayString = finalminutes + ':' + finalseconds;
  }
}
