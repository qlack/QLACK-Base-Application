import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { I18nRoutingModule } from './i18n-routing.module';
import { I18nComponent } from './i18n.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {FlexModule} from "@angular/flex-layout";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    I18nComponent
  ],
  imports: [
    CommonModule,
    I18nRoutingModule,
    MatCardModule,
    MatButtonModule,
    FlexModule,
    TranslateModule
  ]
})
export class I18nModule { }
