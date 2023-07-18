import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { I18nRoutingModule } from "./i18n-routing.module";
import { I18nComponent } from "./i18n.component";
import {TranslateModule} from "@ngx-translate/core";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    I18nComponent
  ],
  imports: [
    CommonModule,
    I18nRoutingModule,
    MatCardModule,
    MatButtonModule,
    TranslateModule
  ]
})
export class I18nModule { }
