import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {

  public lang: string;

  constructor(private translate: TranslateService,) { }

  ngOnInit() {
  }

  // Translates the app to the chosen language
  // Currently (Nov. 2019), English and Spanish are available
  public changeLanguage(lang) {
    this.translate.use(lang);
  }

}
