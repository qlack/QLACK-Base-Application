import { Component, OnInit } from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: "app-i18n",
  templateUrl: "./i18n-view.component.html"
})
export class I18nViewComponent implements OnInit {

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
  }

  switchEN() {
    this.translateService.use("en");
  }

  switchFR() {
    this.translateService.use("fr");
  }
}
