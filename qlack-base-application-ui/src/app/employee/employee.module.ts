import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {EmployeeRoutingModule} from "./employee-routing.module";
import {MatSortModule} from "@angular/material/sort";
import {ReactiveFormsModule} from "@angular/forms";
import {DateSupportModule} from "../shared/module/date-support.module";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CdkTableModule} from "@angular/cdk/table";
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {EmployeeEditComponent} from "./employee-edit/employee-edit.component";


@NgModule({
  declarations: [
    EmployeeListComponent,
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
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    DateSupportModule,
    FontAwesomeModule,
    CdkTableModule
  ]
})
export class EmployeeModule {
}
