import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsRoutingModule } from "./forms-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FormViewComponent} from "./form-view/form-view.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [
    FormViewComponent
  ],
  imports: [
    CommonModule,
    FormsRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatTooltipModule,
    MatIconModule,
    FontAwesomeModule
  ]
})
export class FormsModule { }
