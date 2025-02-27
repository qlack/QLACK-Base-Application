import {Component} from "@angular/core";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";

@Component({
    selector: "app-i18n",
    templateUrl: "./i18n-view.component.html",
    imports: [TranslatePipe]
})
export class I18nViewComponent {

  constructor(private translateService: TranslateService) {
  }

  switchEN() {
    this.translateService.use("en");
  }

  switchFR() {
    this.translateService.use("fr");
  }
}
