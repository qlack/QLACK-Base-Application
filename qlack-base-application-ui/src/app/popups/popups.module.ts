import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PopupsRoutingModule } from "./popups-routing.module";
import { PopupViewComponent } from "./popup-view/popup-view.component";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    PopupViewComponent
  ],
  imports: [
    CommonModule,
    PopupsRoutingModule,
    MatCardModule,
    MatButtonModule,
    FontAwesomeModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ]
})
export class PopupsModule { }
