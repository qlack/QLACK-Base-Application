import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EmployeeRoutingModule } from "./employee-routing.module";
import { EmployeeComponent } from "./employee.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatSortModule} from "@angular/material/sort";
import {FlexModule} from "@angular/flex-layout";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { EmployeeEditComponent } from "./employee-edit.component";
import {DateSupportModule} from "../shared/module/date-support.module";


@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeEditComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatSortModule,
    FlexModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    DateSupportModule
  ]
})
export class EmployeeModule { }
