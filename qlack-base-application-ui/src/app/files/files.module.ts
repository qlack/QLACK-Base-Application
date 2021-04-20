import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilesComponent} from './files.component';
import {FilesRoutingModule} from "./files-routing.module";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import { FilesUploadComponent } from './files-upload.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {FlexModule} from "@angular/flex-layout";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  declarations: [
    FilesComponent,
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
    FlexModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class FilesModule {
}
