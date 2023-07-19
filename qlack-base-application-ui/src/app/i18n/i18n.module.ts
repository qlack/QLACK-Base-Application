import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { I18nRoutingModule } from "./i18n-routing.module";
import { I18nViewComponent } from "./i18-view/i18n-view.component";
import {TranslateModule} from "@ngx-translate/core";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [
    I18nViewComponent
  ],
  imports: [
    CommonModule,
    I18nRoutingModule,
    MatCardModule,
    MatButtonModule,
    TranslateModule,
    FontAwesomeModule
  ]
})
export class I18nModule { }
