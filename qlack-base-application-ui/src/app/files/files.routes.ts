import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {FilesListComponent} from "./files-list/files-list.component";
import {FileUploadComponent} from "./file-upload/file-upload.component";

const routes: Routes = [
  {path: "", component: FilesListComponent, data: {breadcrumb: ""}},
  {path: "upload", component: FileUploadComponent, data: {breadcrumb: "Upload"}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilesRoutes {
}
