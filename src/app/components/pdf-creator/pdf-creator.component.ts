// Angular
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
// Service/s
import { PassdataService } from '../../../services/passdata.service';
// PDF
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

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

  public captureScreen() {
    const data = document.getElementById('finished_setlist');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('test.pdf'); // Generated PDF
    });
  }

  goBack() {
    this.router.navigate(['']);
  }
}
