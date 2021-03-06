// Angular
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
// Service/s
import { PassdataService } from '../../../services/passdata.service';

@Component({
  selector: 'app-pdf-creator',
  templateUrl: './pdf-creator.component.html',
  styleUrls: ['./pdf-creator.component.css']
})
export class PdfCreatorComponent implements OnInit {

  setName: any;
  setTime: any;
  fullsonglist: any;
  toggleIndividualTimer: string;
  singleTimesShown: boolean;
  hideTimes: string = this.translate.instant('action.hidetimes');
  showTimes: string = this.translate.instant('action.showtimes');

  constructor(
    private router: Router,
    private passDataService: PassdataService,
    public translate: TranslateService
  ) {
    this.toggleIndividualTimer = this.hideTimes;
    this.singleTimesShown = true;
  }

  ngOnInit() {
    this.fullsonglist = this.passDataService.finishedSetlist.songs;
    this.setName = this.passDataService.finishedSetlist.setName;
    this.setTime = this.passDataService.finishedSetlist.time;
  }

  /**
   * Lets the user select whether to show each song's individual time or not
   */
  toggleSongTimes() {
    // TODO: This is a botch- try to make this better
    if (this.toggleIndividualTimer === this.hideTimes) {
      this.toggleIndividualTimer = this.showTimes;
    } else {
      this.toggleIndividualTimer = this.hideTimes;
    }
    this.singleTimesShown = !this.singleTimesShown;
  }

  goBack() {
    this.router.navigate(['']);
  }
}
