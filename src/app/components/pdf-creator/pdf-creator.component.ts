// Angular
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
// Service/s
import { PassdataService } from '../../../services/passdata.service';
// PDFMake
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

  printSetlist() {
    const mySet = this.fullsonglist;
    function buildTableBody(data, columns) {
      const body = [];
      body.push(columns);
      data.forEach(function (row) {
        const dataRow = [];
        columns.forEach(function (column) {
          dataRow.push(row[column].toString());
        });
        body.push(dataRow);
      });
      return body;
    }

    function table(data, columns) {
      return {
        layout: 'noBorders',
        table: {
          headerRows: 0,
          body: buildTableBody(data, columns)
        }
      };
    }

    const formattedInfo = {
      content: [
        { text: this.setName, style: 'header' },
        table(mySet, ['name', 'duration'])
      ], defaultStyle: {
        fontSize: 20,
        bold: true,
        columnGap: 20
      }
    };

    pdfMake.createPdf(formattedInfo).download();
  }

  goBack() {
    this.router.navigate(['']);
  }
}
