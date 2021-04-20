import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpRoutingModule } from './http-routing.module';
import { HttpComponent } from './http.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    HttpComponent
  ],
  imports: [
    CommonModule,
    HttpRoutingModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class HttpModule { }
