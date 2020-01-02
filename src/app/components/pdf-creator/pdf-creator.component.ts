import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private passDataService: PassdataService
  ) { }

  ngOnInit() {
  this.fullsonglist = this.passDataService.finishedSetlist.songs;
  this.setName = this.passDataService.finishedSetlist.setName;
  this.setTime = this.passDataService.finishedSetlist.time;
  console.log(this.fullsonglist);
 }
}
