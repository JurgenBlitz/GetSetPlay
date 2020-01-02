// Angular basic dependencies
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
// Service
import { PassdataService } from '../services/passdata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public activeLang = 'eng';
  constructor(
    private translate: TranslateService,
    public passDataService: PassdataService,
    private router: Router
  ) {
    this.translate.setDefaultLang(this.activeLang);
  }

  ngOnInit() {
    this.passDataService.languageChange.subscribe((lang) => {
      this.translate.use(lang);
    });
    this.router.navigate(['']);
  }
}
