import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SensitiveRoutingModule } from "./sensitive-routing.module";
import { SensitiveViewComponent } from "./sensitive-view/sensitive-view.component";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    SensitiveViewComponent
  ],
  imports: [
    CommonModule,
    SensitiveRoutingModule,
    MatCardModule,
    MatIconModule,
    FontAwesomeModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class SensitiveModule { }
