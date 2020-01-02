import { Injectable, Output, EventEmitter } from '@angular/core';
import { Setlist } from '../models/setlist';

@Injectable({
  providedIn: 'root'
})

export class PassdataService {

  @Output() languageChange: EventEmitter<any> = new EventEmitter;

  public finishedSetlist: Setlist;
  public edited: boolean;
  public data: any;

  constructor() {
    this.edited = false;
  }

  public storeList(data) {
    this.edited = true;
    this.finishedSetlist = data;
  }

  public sendLanguageSelection(lang) {
    this.languageChange.emit(lang);
  }

}
