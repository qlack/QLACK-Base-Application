import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SensitiveRoutingModule } from "./sensitive-routing.module";
import { SensitiveComponent } from "./sensitive.component";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    SensitiveComponent
  ],
  imports: [
    CommonModule,
    SensitiveRoutingModule,
    MatCardModule,
    MatIconModule
  ]
})
export class SensitiveModule { }
