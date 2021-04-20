import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SensitiveRoutingModule } from './sensitive-routing.module';
import { SensitiveComponent } from './sensitive.component';
import {MatCardModule} from "@angular/material/card";
import {FlexModule} from "@angular/flex-layout";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    SensitiveComponent
  ],
  imports: [
    CommonModule,
    SensitiveRoutingModule,
    MatCardModule,
    FlexModule,
    MatIconModule
  ]
})
export class SensitiveModule { }
