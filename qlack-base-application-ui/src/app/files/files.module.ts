import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FilesListComponent} from "./files-list/files-list.component";
import {FilesRoutingModule} from "./files-routing.module";
import { FilesUploadComponent } from "./files-upload/files-upload.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSortModule} from "@angular/material/sort";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {CdkTableModule} from "@angular/cdk/table";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [
    FilesListComponent,
    FilesUploadComponent
  ],
  imports: [
    CommonModule,
    FilesRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CdkTableModule,
    FontAwesomeModule
  ]
})
export class FilesModule {
}
