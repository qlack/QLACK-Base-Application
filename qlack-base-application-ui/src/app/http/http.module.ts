import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HttpRoutingModule } from "./http-routing.module";
import { HttpViewComponent } from "./http-view/http-view.component";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [
    HttpViewComponent
  ],
  imports: [
    CommonModule,
    HttpRoutingModule,
    MatCardModule,
    MatButtonModule,
    FontAwesomeModule
  ]
})
export class HttpModule { }
