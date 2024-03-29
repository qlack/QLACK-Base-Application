import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FontAwesomeModule
  ]
})
export class HomeModule { }
