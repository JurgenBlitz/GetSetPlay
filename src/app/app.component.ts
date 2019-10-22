// Angular basic dependencies
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public activeLang = 'eng';
  constructor(
    private translate: TranslateService,
    private router: Router
  ) {
    this.translate.setDefaultLang(this.activeLang);
  }

  ngOnInit() {
    this.router.navigate(['']);
  }
}
