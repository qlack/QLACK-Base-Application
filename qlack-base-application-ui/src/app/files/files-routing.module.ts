import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {FilesListComponent} from "./files-list/files-list.component";
import {FilesUploadComponent} from "./files-upload/files-upload.component";

const routes: Routes = [
  {path: "", component: FilesListComponent, data: {breadcrumb: ""}},
  {path: "upload", component: FilesUploadComponent, data: {breadcrumb: "Upload"}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilesRoutingModule {
}
