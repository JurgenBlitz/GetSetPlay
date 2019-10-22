import { Injectable } from '@angular/core';
import { Setlist } from '../models/setlist';

@Injectable({
  providedIn: 'root'
})

export class PassdataService {

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

}
