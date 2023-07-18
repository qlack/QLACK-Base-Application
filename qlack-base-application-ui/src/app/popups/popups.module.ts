import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PopupsRoutingModule } from "./popups-routing.module";
import { PopupsComponent } from "./popups.component";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    PopupsComponent
  ],
  imports: [
    CommonModule,
    PopupsRoutingModule,
    MatCardModule,
    MatButtonModule,
  ]
})
export class PopupsModule { }
